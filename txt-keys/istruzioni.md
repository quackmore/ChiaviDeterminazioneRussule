Struttura generale
+ Crea un file HTML con <!DOCTYPE html>, <html lang="it">, <head> con <meta charset="UTF-8"> e <body>.
+ Organizza le chiavi in sezioni per numero (es. tutte le chiavi 1a, 1b in una sezione “Chiavi 1”, tutte le 2a, 2b in “Chiavi 2”, ecc.).
+ Metti un’ancora in cima alla pagina: <a id="top"></a>.

Raggruppamento delle chiavi
+ Ogni gruppo numerico va in un <section id="group-X"> con un <h2>Chiavi X</h2>.
+ Dentro ogni sezione usa una tabella <table class="keys"> per le chiavi di quel numero.

Layout a 3 colonne per ogni chiave
  Ogni chiave è una riga della tabella:
  Prima colonna (identificativo chiave):
  <td class="col-code">1a</td>
  Contiene solo il codice (1a, 1b, 2a, 2b, …) in grassetto.
  Seconda colonna (testo/istruzioni):
  <td class="col-text">[descrizione della chiave ripulita]</td>
  Qui va tutta la descrizione testuale, senza la freccia -> e senza ripetere il risultato.
  Terza colonna (risultato):
  <td class="col-result">[specie o link alla prossima chiave]</td>
  Formattazione della specie
  Se la chiave porta direttamente a una specie:
  Scrivi il nome in corsivo-grassetto: <strong><em>R. nome</em></strong>.
  Se la chiave porta a un’altra chiave numerica:
  Metti solo il numero come link: <a href="#k-3a">3</a> (esempio).
  Gestione dei link tra chiavi
  Ogni chiave (riga) ha un id del tipo k-1a, k-2b, ecc.:
  <tr id="k-1a"> ... </tr>
  Quando nel testo originale c’è “-> 3”, sostituisci con un link alla prima chiave con quel numero, es. “3a”:
  <a href="#k-3a">3</a>.

Link “torna su”
Alla fine di ogni sezione (gruppo numerico) metti un solo link “torna su”:
<a class="top-link" href="#top">torna su</a>

Lo stile può essere definito nel CSS (es. dimensione ridotta, freccia “↑” aggiunta con ::before).
CSS minimo consigliato
Corpo pagina: font sans-serif, margini comodi.
section: con un po’ di padding e un bordo laterale per separare i gruppi.
table.keys: width: 100%; border-collapse: collapse;.
.col-code: larghezza fissa (es. 4rem), font-weight: bold, white-space: nowrap.
.col-result: larghezza ridotta (es. 20%), white-space: nowrap, allineata a destra.
Link normali blu, con sottolineatura al passaggio del mouse.

