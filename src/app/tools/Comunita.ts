export interface Prenotazione {
    studente : string;
    ora_inizio : [number , number]
    ora_fine: [number , number]
} 

export interface Cerco {

}
export interface Libero {

}

export interface Auletta {
    auletta: string 
    prenotazione : null | Prenotazione
}

export interface Lavatrice {
    lato : string
    prenotazioni : null | [Prenotazione]
    
}