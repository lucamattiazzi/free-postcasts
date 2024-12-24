# [I podcast de Il Post gratuiti](https://i-podcast-de-il-post-gratuiti-finche-non-sistemano-i-server.it/)

Volendo crearmi un feed RSS personale e autenticato per poter ascoltare Morning su app diverse da quella de Il Post (sono abbonato) ho trovato parecchie falle di sicurezza nelle API usate dall'app.

Tra le varie falle, la possibilità di ascoltare gratuitamente tutti i loro podcast usando un endpoint aperto che viene interrogato dall'app per scaricarsi l'elenco degli episodi.

Anche tutti i file .mp3 degli episodi sono accessibili senza autenticazione (quello da sempre, ma almeno l'indirizzo non mi sembra facilmente prevedibile), quindi dopo diversi mesi e diverse mail in cui li ho avvisati, pubblico questa pagina completamente statica (a parte l'aggiramento dei CORS) sulla quale si possono ascoltare i podcast gratuitamente.

Di fatto, tutti questi file queste informazioni sono liberamente accessibili da chiunque, io l'ho solo notato.

Disponibile finchè non cambiano qualcosa.

## Il sito

La ricerca delle vulnerabilità fatta mesi fa, in estate a tempo perso.

Il frontend fatto in un'ora scarsa con vite+React, usando massicciamente Claude per il design perchè non avevo voglia.

Solo per mostrare quanto sia semplice aggirare la sicurezza quando non viene fatta bene.
