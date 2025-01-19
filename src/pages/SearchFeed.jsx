import { useLocation } from "react-router-dom";

export default function SearchFeed() {
  const searchQuery = useLocation();
  console.log(searchQuery)
  return (
    <div>SearchFeed</div>
  )
}
