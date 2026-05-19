import SearchInput
  from "@/components/inputs/SearchInput";

export default function BarcodeSearch({

  value,

  onChange,

}) {

  return (

    <div
      className="
        flex
        flex-col
        gap-4

        lg:flex-row
      "
    >

      <SearchInput

        placeholder="
          Buscar producto...
        "

        value={value}

        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
      />

    </div>

  );

}