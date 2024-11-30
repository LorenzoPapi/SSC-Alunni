export interface Comunicazione {
    titolo: string
    descrizione : string
}

export interface Sondaggio{
    question: string;
    answers: {
      text: string, selected:boolean
    }[];
  }
  