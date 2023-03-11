import { Label } from '@mui/icons-material';
import * as React from 'react'
import '../Basket.css'


interface Props {
    postalcode: string,
    onUpdateItems?: (updatedItems: Address[]) => void,
}

interface Address {
    vejnavn: string | null,
    postnr: string | null,
    postnrnavn: string | null,
    husnr: string | null,
    fullAdress: string,
    dør:string | null,
    etage:string | null

}

const MAXRESULT = 4;

    async function fetchData(input:string) {
    let apiUrl = `https://api.dataforsyningen.dk/autocomplete?q=${input}&caretpos=${input.length}&per_side=${MAXRESULT}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      const mappedData = data.map((item: any) => {
        const mappedItem: Address = {
          vejnavn: item.data.vejnavn,
          postnr: item.data.postnr,
          postnrnavn: item.data.postnrnavn,
          husnr: item.data.husnr,
          dør: item.data.dør,
          etage: item.data.etage,
          fullAdress: item.forslagstekst
        };
        return mappedItem;
      });
      return(mappedData);
    }

  




export function PostalCodeinput({ postalcode }: Props) {
    const [inputString, setinput] = React.useState("");
    const [autoCompleteOptions, Setoptions] = React.useState<Address[]>([]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setinput(event.target.value);
        Setoptions(await fetchData(inputString));
        if(inputString.length < 1 ){
            Setoptions([]);
        }
    };
    const handleOptionClick = (option: Address) => {
        setinput(option.fullAdress);
        Setoptions([]);
    };

    return (
        <div className='autocomplete' >
            <label htmlFor="input" />
            <input id='input' type="text"  name='Address' value={inputString} onChange={handleChange} autoComplete="off" list="suggestions"></input>
            {autoCompleteOptions?.length > 0 && (
                <ul className="options">
                    {autoCompleteOptions.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option)}>
                            {option.fullAdress}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )


}