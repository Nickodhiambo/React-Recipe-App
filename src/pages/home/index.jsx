import { useContext } from "react"
import { GlobalContext } from "../../context"
import RecipeItem from "../../components/recipe-item"

export default function Home() {

    const { data, loading } = useContext(GlobalContext)

    if (loading) return <div>Loading data...</div>

    return <div
        className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {
            data && data.length ?
                data.map((item, index) => <RecipeItem key={index} item={item} />)
                :
                <div>
                    <p
                        className="lg:text-4xl text-xl text-center text-black font-bolder">
                        Nothing to show. Please search something
                    </p>
                </div>
        }
    </div>
}