import {describe, expect, beforeEach, it,  afterAll, afterEach, beforeAll} from 'vitest';
import {setActivePinia, createPinia} from 'pinia';
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import {usePokemonStore} from "@/stores/pokemonApi";

const mockPokemon = {
        id: 1,
        name: 'pikachu'
    }

export const restHandlers = [
    http.get('https://pokeapi.co/api/v2/pokemon/*', () => {
        return HttpResponse.json(mockPokemon)
    }),
]

const server = setupServer(...restHandlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('Pokemon Api', () => {
    let pokemonStore: any;

    beforeEach(() => {
        setActivePinia(createPinia())
        pokemonStore = usePokemonStore()
    })

    it('api should return object with id of the pokemon', async () => {
        const id = 1
        const pokemon = await pokemonStore.fetchPokemon(id);
        expect(pokemon?.id).toEqual(id)
    })

    it('api should return object with name of the pokemon', async () => {
        const pokemonName = "pikachu"
        const pokemon = await pokemonStore.fetchPokemon(pokemonName);
        expect(pokemon?.name).toEqual(pokemonName)
    })

    it('pokemonId should be in savedPokemonIds', async () => {
        const id = 1
        await pokemonStore.fetchPokemon(id);
        pokemonStore.save()
        expect(pokemonStore.savedPokemonIds).includes(id)
    })
})
