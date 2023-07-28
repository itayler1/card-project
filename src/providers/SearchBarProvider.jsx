import Joi from 'joi';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const SearchBarContext = createContext();

export default function SearchBarProvider({children}) {

    const searchSchema = Joi.object({
        searchBar: Joi.string()
          .allow('')
          .pattern(/^[A-Za-z]+$/)
          .messages({
            'string.pattern.base': 'Should contain only English alphabets',
          }),
      });

    const [searchBarInput, setSearchBar] = useState();
    const [errors, setErrors] = useState(null);


    const handleSearch = useCallback(({target}) =>{
        const inputName = target.name;
        const schemaObject = searchSchema._ids._byKey.get(inputName);
        const inputSchema = schemaObject.schema;

        setSearchBar(target.value);
        
        const joiPropertySchema = Joi.object({
            inputName: inputSchema,
          });
          const obj = { inputName: target.value };
          const { error } = joiPropertySchema.validate(obj);

        if (error) {
            setErrors(error.details[0].message);
            console.log(errors);
        }
        else{
            setErrors(null);
        };
    },[searchBarInput,errors]);

    const states = useMemo(()=>{return {searchBarInput,errors}},[searchBarInput,errors]);


  return (
    <SearchBarContext.Provider value={{handleSearch, states}}>
      {children}
    </SearchBarContext.Provider>
  )
}

export const useSearchBar = () => {
    const context = useContext(SearchBarContext);
    if (!context) throw Error("useSearchBar must be used within a SearchBarProvider");
    return context;
  };