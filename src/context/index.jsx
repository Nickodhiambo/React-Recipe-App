import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [recipeDetailsData, setRecipeDetailsData] = useState(null)
    const [favoritesList, setFavoritesList] = useState([])

    const navigate = useNavigate()

    const apiURL = 'https://forkify-api.herokuapp.com/api/v2/recipes'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch(`${apiURL}?search=${searchParam}`)
            const data = await res.json()

            if (data && data.recipes) {
                setLoading(false)
                setData(data.recipes)
                setSearchParam('')
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setSearchParam('')
        }
    }

    const handleAddToFavorites = (getCurrentItem) => {
        console.log(getCurrentItem)
        let cpyFavoriteList = [...favoritesList]
        const index = cpyFavoriteList.findIndex(item => item.id === getCurrentItem.id)

        if (index === -1){
            cpyFavoriteList.push(getCurrentItem)
        } else {
            cpyFavoriteList.splice(index)
        }
        
        setFavoritesList(cpyFavoriteList)
    }

    return <GlobalContext.Provider
        value={{
            searchParam, setSearchParam,
            handleSubmit,
            loading,
            data,
            recipeDetailsData, setRecipeDetailsData,
            handleAddToFavorites, favoritesList,
        }}>
        {children}
    </GlobalContext.Provider>
}