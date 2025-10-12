import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();
  return <h2>User Profile for User ID: {userId}</h2>;
}
