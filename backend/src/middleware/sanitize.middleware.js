export const sanitizeInput = (req, res, next) => {
  const sanitize = (value) => {
    if (typeof value !== "string") return value;
    return value
      .trim()
      .replace(/<[^>]*>/g, "")
      .replace(/[\x00-\x1F\x7F]/g, "")
      .slice(0, 1000);
  };

  const sanitizeObj = (obj) => {
    if (!obj || typeof obj !== "object") return obj;
    const clean = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object" && value !== null) {
        clean[key] = sanitizeObj(value);
      } else {
        clean[key] = sanitize(value);
      }
    }
    return clean;
  };

  // 🔥 body sí se puede sobreescribir
  if (req.body) {
    req.body = sanitizeObj(req.body);
  }

  // 🔥 query NO se puede sobreescribir directamente — sanitizamos cada propiedad
  if (req.query) {
    const cleanQuery = sanitizeObj({ ...req.query });
    Object.keys(cleanQuery).forEach((key) => {
      req.query[key] = cleanQuery[key];
    });
  }

  // 🔥 params igual — sanitizamos cada propiedad individualmente
  if (req.params) {
    const cleanParams = sanitizeObj({ ...req.params });
    Object.keys(cleanParams).forEach((key) => {
      req.params[key] = cleanParams[key];
    });
  }

  next();
};

export const validateUUID = (paramName) => (req, res, next) => {
  const uuid = req.params[paramName];
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (uuid && !uuidRegex.test(uuid)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  next();
};