export interface Cerco {

}
export interface Libero {

}

export interface Auletta {
    auletta: string 
    prenotazione : null | {
        studente : string 
        inizio: [number, number]
        fine: [number, number]
    }
}

export interface Lavatrice {
    lato : string
    prenotazione : null | {
        studente: string
        inizio: [number, number]
        fine: [number, number]
    }
    
}