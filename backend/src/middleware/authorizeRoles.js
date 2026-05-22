export const authorizeRoles =
  (...allowedRoles) => {

    return (
      req,
      res,
      next
    ) => {

      try {

        const user =
          req.user;

        // 🔥 NO USER
        if (!user) {

          return res.status(401).json({

            success: false,

            message:
              "Unauthorized"

          });
        }

        // 🔥 ROLE BLOCKED
        if (
          !allowedRoles.includes(
            user.role
          )
        ) {

          return res.status(403).json({

            success: false,

            message:
              "Forbidden"

          });
        }

        next();

      } catch (error) {

        console.error(error);

        return res.status(500).json({

          success: false,

          message:
            error.message

        });
      }
    };
  };