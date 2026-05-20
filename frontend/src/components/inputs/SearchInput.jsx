import { Search } from "lucide-react";
import Input from "./Input";

export default function SearchInput(props) {
  return <Input type="text" placeholder="Buscar..." icon={Search} {...props} />;
}
