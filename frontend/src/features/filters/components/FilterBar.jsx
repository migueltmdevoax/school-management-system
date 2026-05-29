import FilterButton
from "./FilterButton";

export default function FilterBar({

  filter,

  setFilter,

}) {

  return (

    <div className="
      mb-6
      flex
      flex-wrap
      gap-3
    ">

      <FilterButton

        active={
          filter === "all"
        }

        onClick={() =>
          setFilter("all")
        }
      >

        All

      </FilterButton>





      <FilterButton

        active={
          filter === "risk"
        }

        onClick={() =>
          setFilter("risk")
        }
      >

        At Risk

      </FilterButton>





      <FilterButton

        active={
          filter === "payments"
        }

        onClick={() =>
          setFilter("payments")
        }
      >

        Pending Payments

      </FilterButton>





      <FilterButton

        active={
          filter === "excellent"
        }

        onClick={() =>
          setFilter("excellent")
        }
      >

        Excellent Students

      </FilterButton>

    </div>

  );

}