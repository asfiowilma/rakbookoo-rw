import SearchBar from './SearchBar'
import SearchTagField from '../Form/SearchTagField'
import { Form, useForm } from '@redwoodjs/forms'
import SearchAuthorField from '../Form/SearchAuthorField'
import { HiTable, HiViewGrid } from 'react-icons/hi'
import { BiFilter, BiSort } from 'react-icons/bi'
import { CollapseButton, CollapseContent } from '../Collapse'
import useCollapse from 'src/hooks/useCollapse'
import { MdViewList } from 'react-icons/md'

const Search = () => {
  const formMethods = useForm()
  const { setValue } = formMethods

  const { isCollapsed, toggleCollapse } = useCollapse()

  return (
    <Form
      formMethods={formMethods}
      className="mb-4 flex w-full flex-col items-center gap-4"
    >
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <SearchBar />
        <div className="flex gap-4">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-outline">
              <BiSort className="h-5 w-5" /> Urutkan
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-2 w-52 bg-base-200 p-2 shadow"
            >
              <li>
                <span>Item 1</span>
              </li>
              <li>
                <span>Item 2</span>
              </li>
            </ul>
          </div>
          <CollapseButton
            onClick={toggleCollapse}
            className={`btn-outline gap-2 ${
              !isCollapsed && 'bg-base-content text-base-300'
            }`}
          >
            <BiFilter className="h-5 w-5" /> Filter
          </CollapseButton>
          <div className="dropdown dropdown-end">
            <button className="btn btn-outline gap-2">
              <HiViewGrid className="h-5 w-5" />
              Tampilan
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-2 w-min bg-base-200 p-2 shadow"
            >
              <li>
                <span>
                  <HiViewGrid className="h-5 w-5" />
                  Thumbnail
                </span>
              </li>
              <li>
                <span>
                  <MdViewList className="h-5 w-5" />
                  List
                </span>
              </li>
              <li>
                <span>
                  <HiTable className="h-5 w-5" />
                  Tabel
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <CollapseContent
        isCollapsed={isCollapsed}
        className="card w-full overflow-visible bg-base-200 p-4"
      >
        <div className="spacing text-sm font-bold uppercase ">Filter</div>
        <div className="flex flex-row gap-4 ">
          <span>Berdasarkan</span>
          <SearchTagField className="min-w-[12rem]" setValue={setValue} />
          <SearchAuthorField className="min-w-[12rem]" setValue={setValue} />
          <div className="btn btn-primary ">Terapkan</div>
        </div>
      </CollapseContent>
    </Form>
  )
}

export default Search
