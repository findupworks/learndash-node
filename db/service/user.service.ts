import {Op} from 'sequelize'
// import {isEmpty} from 'lodash'

import {User} from '../models'
// import {GetAllIngredientsFilters} from './types'
import {UserInput, UserOuput} from '../models/User'

// export const create = async (payload: IngredientInput): Promise<IngredientOuput> => {
//     const ingredient = await Ingredient.create(payload)
//
//     return ingredient
// }

// export const findOrCreate = async (payload: IngredientInput): Promise<IngredientOuput> => {
//     const [ingredient] = await Ingredient.findOrCreate({
//         where: {
//             name: payload.name
//         },
//         defaults: payload
//     })
//
//     return ingredient
// }
//
// export const update = async (id: number, payload: Partial<IngredientInput>): Promise<IngredientOuput> => {
//     const ingredient = await Ingredient.findByPk(id)
//
//     if (!ingredient) {
//         // @todo throw custom error
//         throw new Error('not found')
//     }
//
//     const updatedIngredient = await ingredient.update(payload)
//     return updatedIngredient
// }
//
export const getById = async (id: number): Promise<User> => {
    const user = await User.findByPk(id)

    if (!user) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return user
}

export const getAll = async (
    // filters?: GetAllIngredientsFilters
): Promise<UserOuput[]> => {
    return User.findAll({
        // where: {
        //     ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        // },
        // ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}
