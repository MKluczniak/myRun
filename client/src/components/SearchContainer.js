import { FormRow, FormRowSelect } from "."
import Wrapper from "../assets/wrappers/SearchContainer"
import { useSelector, useDispatch } from "react-redux"

import { handleChange, clearFilters } from "../features/AllRuns/allRunsSlice"
import { useState } from "react"

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("")

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allRuns)

  const { statusOptions } = useSelector((store) => store.run)

  const dispatch = useDispatch()
  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLocalSearch("")
    dispatch(clearFilters())
  }
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          {/* <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all"]}
          /> */}
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
