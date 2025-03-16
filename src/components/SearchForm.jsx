import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useState } from 'react'

export default function SearchForm() {

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)

    const [searchFilters, setSearchFilters] = useState({
        ingredient: "",
        category: ""
    })

    useEffect(() => {
        fetchCategories()
    }, [])


    const handleChange = (e) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    //literal 36
    const handleSubmit = (e) => {
        e.preventDefault()

        //TODO: Validar
        if (Object.values(searchFilters).includes('')) {
            showNotification('Todos los campos son obligatorios', 'error')
            return
        }

        // consultar las recetas
        searchRecipes(searchFilters)
    }


    return (
        <form
            className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-16 p-10 rounded-lg shadow space-y-6'
            onSubmit={handleSubmit}>
            <div className='space-y-4'>
                <label
                    htmlFor="ingredient"
                    className='block text-white uppercase font-extrabold text-lg'>Nombre o Ingredientes</label>
                <input
                    id='ingredient'
                    type='text'
                    name='ingredient'
                    className='p-3 w-full rounded-lg focus:outline-none bg-white'
                    placeholder='Nombre o Ingrediente. Ej. Vodka, Tequila, Café'
                    value={searchFilters.ingredient} // 🔹 Literal 33: El input refleja el estado
                    onChange={handleChange} // 🔹 Literal 33: Actualiza el estado al escribir
                />
            </div>
            <div className='space-y-4'>
                <label
                    htmlFor="category"
                    className='block text-white uppercase font-extrabold text-lg'>Categoría</label>
                <select
                    id='category'
                    name='category'
                    className='p-3 w-full rounded-lg focus:outline-none bg-white'
                    value={searchFilters.category} // 🔹 Literal 33: El select refleja el estado
                    onChange={handleChange} // 🔹 Literal 33: Actualiza el estado al cambiar la opción
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option value={category.strCategory} key={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </select>
            </div>
            <input
                type='submit'
                value='Buscar Recetas'
                className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase' />
        </form>
    )
}