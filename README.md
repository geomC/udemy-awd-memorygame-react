# Memory Game done with react following the Udemy Advanced developer course

## Approach notes

### Components

App
	NavBar
	CardBoard // actually does nothing, does not need to be a component
		Card


---------------

### App State: 
{
    memoryData = [
  	{
  		id: 3,
  		color: #rgb
  	},
    ...
  ],
  activeCardId: number || null
}

CardBoard Props: memoryData, activeCardId
Card props: id, visible , color, onClick (nur visible === false), 


----------------

### Initialisation
    NUM_PAIRS = someNumber

    Liste mit Paaren von Karten populieren (
    State.memoryData)

    --> so oft wie NumPairs zwei Kartenpaare erzeugen undd abei die ID hochzählen

    dann diese Liste zufällig sortieren (https://www.npmjs.com/package/shuffle-array)

    Karten anhand der Liste rendern und listener Registrieren


### Listener
    Für geklickte Karte visible/turned auf true setzen

    Wenn in der Runde noch keine Karte gedreht wurde (wenn activeCardId null ist)
    
      für die geklickte Karte den State Eintrag ändern
        die ID in state.activeCardId hinterlegen

    ansonsten (wenn in der Runde schon eine Karte gedreht wurde)
      für geklickte Karte in State Eintrag die Farbe entnehmen und mit der Farbe der Aktiven Karte (via ID) vergleichen

      Wenn diese nicht gleich ist 
        für die erste Karte anhand activeCardId sowie die für die zweite Karte turned/visible false setzen
  
      In jedem Fall  
      
        activeCardId auf null zurücksetzen
    


### eset

  State.memoryData neu populieren