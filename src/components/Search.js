import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import Link from './Link'

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;


const Search = () => {
  const [searchFilter, setSearchFilter] = useState('')
  const [toSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY)
  return (
    <>
      <div>
        Search
        <input 
          type="text"
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value) }
        />
        <button onClick={() => toSearch({variables: {filter: searchFilter}})}>OK</button>
      </div>
      {data &&
        data.feed.links.map( (el, i) => {
          return <Link key={el.id} link={el} index={i} />
        })}
    </>
  )
}

export default Search