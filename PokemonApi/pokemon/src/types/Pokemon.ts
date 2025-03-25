type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    abilities: Abilities;
    forms: Url[];
    moves: Moves;
};
