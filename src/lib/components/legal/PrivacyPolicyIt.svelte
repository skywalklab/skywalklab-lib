<script lang="ts">
  // Original Privacy Template: https://github.com/basecamp/policies/blob/master/privacy/index.md?plain=1

  interface Props {
    /** Company the policy belongs to. */
    companyName: string;
    /** Domain the policy covers. */
    websiteDomain?: string;
    /** Path to the contact page. */
    contactLink: string;
    /** Include the Google Analytics section. */
    googleAnalytics?: boolean;
    /** Include the Google Ads section. */
    googleAds?: boolean;
    /** Include the Meta Pixel section. */
    metaPixel?: boolean;
    /** Include the Klaviyo section. */
    klaviyo?: boolean;
    /** Date the policy was last updated. */
    updated?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    companyName,
    websiteDomain = "skywalklab.com",
    contactLink,
    googleAnalytics = false,
    googleAds = false,
    metaPixel = false,
    klaviyo = false,
    updated = "21 luglio 2026",
    style
  }: Props = $props();

  const hasAnalytics = $derived(googleAnalytics);
  const hasAds = $derived(googleAds || metaPixel);
  const hasTracking = $derived(hasAnalytics || hasAds);
</script>

<div class="privacy standard" id="privacy-page-id" {style}>
  <section>
    <div class="inner-container">
      <h1 id="privacy-policy">Informativa sulla privacy</h1>
      <hr />
      <p class="last-updated"><em>Ultimo aggiornamento: {updated}</em></p>
      <p>
        La privacy dei tuoi dati — e sono i tuoi dati, non i nostri! — è molto importante per noi. In questa
        informativa, spieghiamo: quali dati raccogliamo e perché; come vengono gestiti i tuoi dati; e i tuoi diritti
        relativi ai tuoi dati. Promettiamo che non vendiamo mai i tuoi dati: non lo abbiamo mai fatto e non lo faremo
        mai.
      </p>
      <p>Questa informativa è suddivisa in sezioni. Per comodità, i link a ciascuna sezione sono i seguenti:</p>
      <ul>
        <li>
          <a href="#privacy-policy">Informativa sulla privacy</a>
        </li>
        <li>
          <a href="#what-we-collect-and-why">Cosa raccogliamo e perché</a>
        </li>
        <li>
          <a href="#when-we-access-or-disclose-your-information">Quando accediamo o divulghiamo le tue informazioni</a>
        </li>
        <li>
          <a href="#your-rights-with-respect-to-your-information">I tuoi diritti relativi alle tue informazioni</a>
        </li>
        <li>
          <a href="#california-privacy-rights">Diritti sulla privacy in California</a>
        </li>
        <li>
          <a href="#how-we-secure-your-data">Come proteggiamo i tuoi dati</a>
        </li>
        <li>
          <a href="#data-retention">Conservazione dei dati</a>
        </li>
        <li>
          <a href="#cookies">Cookie</a>
        </li>
        <li>
          <a href="#location-of-site-and-data">Ubicazione del sito e dei dati</a>
        </li>
        <li>
          <a href="#when-transferring-personal-data-from-the-eu">Trasferimento dei dati personali dall'UE</a>
        </li>
        <li>
          <a href="#changes-and-questions">Modifiche e domande</a>
        </li>
      </ul>
      <p>
        Questa informativa si applica a tutti i prodotti e servizi offerti da {companyName}, inclusi quelli su
        {websiteDomain} e i suoi sottodomini.
      </p>
      <p>
        Questa informativa si applica alla nostra gestione delle informazioni sui visitatori del sito, potenziali
        clienti e clienti (in relazione all'acquisizione dei servizi e alla gestione del loro rapporto con
        {companyName}). Ci riferiamo collettivamente a queste categorie di individui come "tu" in tutta questa
        informativa.
      </p>
      <p>
        Tuttavia, questa informativa non copre le informazioni sugli utenti finali di un cliente che {companyName}
        riceve da un cliente, o che altrimenti elabora per conto di un cliente, in relazione ai servizi forniti da
        {companyName}
        al cliente ai sensi di un accordo di servizio applicabile. {companyName} elabora tali informazioni secondo le istruzioni
        del cliente pertinente, che è il "titolare del trattamento" o "azienda" (o occupa un ruolo simile come definito dalle
        leggi sulla privacy applicabili), come descritto nell'accordo di servizio applicabile tra tale cliente e {companyName}.
      </p>
      <p>
        Se sei un utente finale di un cliente e hai domande su come le tue informazioni vengono raccolte ed elaborate
        attraverso i servizi, contatta l'organizzazione che ci ha fornito le tue informazioni per maggiori dettagli.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="what-we-collect-and-why">Cosa raccogliamo e perché</h2>
      <p>Il nostro principio guida è raccogliere solo ciò che è necessario. Ecco cosa significa in pratica:</p>
      <h3>Identità e accesso</h3>
      <p>
        Quando contatti {companyName} o utilizzi i nostri servizi, chiediamo informazioni identificative come il tuo nome,
        indirizzo email e possibilmente il nome dell'azienda. Questo ci permette di comunicare con te riguardo al tuo progetto
        e inviarti aggiornamenti importanti. Potremmo anche inviarti occasionalmente informazioni facoltative sui nostri servizi.
        Con il tuo consenso, ti invieremo la nostra newsletter e altri aggiornamenti.
      </p>
      <p>
        Non venderemo mai le tue informazioni personali a terzi e non useremo il tuo nome o quello della tua azienda in
        dichiarazioni di marketing senza il tuo permesso.
      </p>
      <h3>Informazioni di fatturazione</h3>
      <p>
        Se utilizzi i servizi a pagamento di {companyName}, ti verrà chiesto di fornire le tue informazioni di pagamento
        e l'indirizzo di fatturazione. Le informazioni della carta di credito vengono inviate direttamente al nostro
        processore di pagamenti e non passano per i server di {companyName}. Conserviamo un registro della transazione
        di pagamento, incluse le ultime 4 cifre del numero della carta di credito, per scopi di cronologia dell'account,
        fatturazione e supporto alla fatturazione. Conserviamo il tuo indirizzo di fatturazione per poterti addebitare
        il servizio, calcolare eventuali imposte sulle vendite dovute, inviarti fatture e rilevare transazioni
        fraudolente con carta di credito.
      </p>
      <h3>Interazioni con il sito web</h3>
      <p>
        Raccogliamo informazioni di base sulla tua attività di navigazione per comprendere come i visitatori utilizzano
        il nostro sito web. Questo include le versioni del tuo browser e sistema operativo, il tuo indirizzo IP e quali
        pagine web hai visitato. Queste informazioni ci aiutano a migliorare il nostro sito web e i nostri servizi.
      </p>
      <h3>Dati di geolocalizzazione generali</h3>
      <p>
        Registriamo l'indirizzo IP completo utilizzato per accedere al nostro sito web per scopi di sicurezza e
        prevenzione delle frodi.
      </p>
      <h3>Comunicazioni</h3>
      <p>
        Quando ci contatti tramite il nostro modulo di contatto o email, raccogliamo le informazioni che fornisci (nome,
        email, contenuto del messaggio) per poter rispondere alla tua richiesta e mantenere registri delle nostre
        comunicazioni.
      </p>
      {#if klaviyo}
        <h3>Email marketing</h3>
        <p>
          Se ti iscrivi alla nostra newsletter o alle email di marketing, utilizziamo Klaviyo per gestire le nostre
          comunicazioni email. Klaviyo raccoglie il tuo indirizzo email e traccia come interagisci con le nostre email
          (come aperture e clic) per aiutarci a migliorare le nostre comunicazioni. Puoi annullare l'iscrizione in
          qualsiasi momento utilizzando il link in qualsiasi email. Per maggiori informazioni, consulta l'<a
            href="https://www.klaviyo.com/legal/privacy/privacy-notice"
            target="_blank"
            rel="noopener">Informativa sulla privacy di Klaviyo</a
          >.
        </p>
      {/if}
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="when-we-access-or-disclose-your-information">Quando accediamo o divulghiamo le tue informazioni</h2>
      <p>
        <strong>Per fornire prodotti o servizi che hai richiesto</strong>. Utilizziamo alcuni sub-responsabili terzi per
        aiutarci a gestire le nostre applicazioni e fornirti i Servizi.
      </p>
      <p>
        Nessun dipendente di {companyName} visualizza i tuoi contenuti se non per scopi limitati con il tuo esplicito consenso,
        ad esempio, se si verifica un errore che impedisce il funzionamento di un processo automatizzato e richiede un intervento
        manuale per la correzione. Questi casi sono rari e, quando si verificano, cerchiamo soluzioni alla causa principale
        il più possibile per evitare che si ripetano. Potremmo anche accedere ai tuoi dati se richiesto per rispondere a procedimenti
        legali (vedi "Quando richiesto dalla legge applicabile" di seguito).
      </p>
      <p>
        <strong>Per aiutarti a risolvere problemi o correggere un bug software, con il tuo permesso.</strong> Se in qualsiasi
        momento abbiamo bisogno di accedere ai tuoi contenuti per aiutarti con un caso di supporto, chiederemo il tuo consenso
        prima di procedere.
      </p>
      <p>
        <strong>Dati aggregati e anonimizzati.</strong> Potremmo aggregare e/o anonimizzare le informazioni raccolte attraverso
        i servizi. Potremmo utilizzare dati anonimizzati o aggregati per qualsiasi scopo, incluso marketing o analisi.
      </p>
      <p>
        <strong>Quando richiesto dalla legge applicabile.</strong>
        {companyName} opera con infrastruttura dati negli Stati Uniti e nell'UE.
      </p>
      <ul>
        <li>
          <p>
            Richieste di dati degli utenti. La nostra politica è di non rispondere alle richieste governative di dati
            degli utenti a meno che non siamo obbligati da un procedimento legale o in circostanze limitate in caso di
            richiesta d'emergenza. Tuttavia, se le autorità di polizia dispongono del mandato necessario, citazione
            penale o ordinanza del tribunale che ci richiede di divulgare i dati, dobbiamo conformarci. È politica di
            {companyName}
            notificare i clienti interessati prima di divulgare i dati, a meno che non ci sia legalmente vietato farlo, e
            tranne in alcuni casi di emergenza.
          </p>
        </li>
        <li>
          <p>
            Richieste di conservazione. Allo stesso modo, la politica di {companyName} è di conformarsi alle richieste di
            conservazione dei dati solo se obbligati da un procedimento legale appropriato. Non divulghiamo i dati conservati
            a meno che non sia richiesto dalla legge o da un'ordinanza del tribunale.
          </p>
        </li>
        <li>
          <p>
            Se siamo sottoposti a verifica da parte di un'autorità fiscale, potremmo essere tenuti a divulgare
            informazioni relative alla fatturazione. In tal caso, divulgheremo solo il minimo necessario, come indirizzi
            di fatturazione e informazioni sull'esenzione fiscale.
          </p>
        </li>
      </ul>
      <p>
        Infine, se {companyName} viene acquisita o si fonde con un'altra azienda — non lo prevediamo, ma se dovesse accadere
        — ti avviseremo con largo anticipo prima che le tue informazioni personali vengano trasferite o diventino soggette
        a una diversa informativa sulla privacy.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="your-rights-with-respect-to-your-information">I tuoi diritti relativi alle tue informazioni</h2>
      <p>
        In {companyName}, ci impegniamo ad applicare gli stessi diritti sui dati a tutti i clienti, indipendentemente
        dalla loro ubicazione. Alcuni di questi diritti includono:
      </p>
      <ul>
        <li>
          <strong>Diritto di conoscere.</strong> Hai il diritto di sapere quali informazioni personali vengono raccolte, utilizzate,
          condivise o vendute. Descriviamo sia le categorie che i tipi specifici di dati che raccogliamo, nonché come vengono
          utilizzati, in questa informativa sulla privacy.
        </li>
        <li>
          <strong>Diritto di accesso.</strong> Questo include il tuo diritto di accedere alle informazioni personali che raccogliamo
          su di te e il tuo diritto di ottenere informazioni sulla condivisione, archiviazione, sicurezza ed elaborazione
          di tali informazioni.
        </li>
        <li>
          <strong>Diritto di rettifica.</strong> Hai il diritto di richiedere la correzione delle tue informazioni personali.
        </li>
        <li>
          <strong>Diritto alla cancellazione / "Diritto all'oblio".</strong> Questo è il tuo diritto di richiedere,
          soggetto a determinate limitazioni previste dalla legge applicabile, che le tue informazioni personali vengano
          cancellate dal nostro possesso e, di conseguenza, da tutti i nostri fornitori di servizi. L'adempimento di
          alcune richieste di cancellazione dei dati potrebbe impedirti di utilizzare i servizi di {companyName} perché le
          nostre applicazioni potrebbero non funzionare più. In tali casi, una richiesta di cancellazione dei dati potrebbe
          comportare la chiusura del tuo account.
        </li>
        <li>
          <strong>Diritto di reclamo.</strong> Hai il diritto di presentare un reclamo riguardo alla nostra gestione delle
          tue informazioni personali presso l'autorità di controllo competente.
        </li>
        <li>
          <strong>Diritto di limitazione del trattamento.</strong> Questo è il tuo diritto di richiedere la limitazione di
          come e perché le tue informazioni personali vengono utilizzate o elaborate, incluso il rifiuto della vendita delle
          tue informazioni personali. (Ancora: non abbiamo mai venduto e non venderemo mai i tuoi dati personali.)
        </li>
        <li>
          <strong>Diritto di opposizione.</strong> Hai il diritto, in determinate situazioni, di opporti a come o perché le
          tue informazioni personali vengono elaborate.
        </li>
        <li>
          <strong>Diritto alla portabilità.</strong> Hai il diritto di ricevere le informazioni personali che abbiamo su
          di te e il diritto di trasmetterle a un'altra parte. Se desideri esportare i dati, puoi
          <a href={contactLink}>contattarci</a>.
        </li>
        <li>
          <strong>Diritto di non essere soggetto a decisioni automatizzate.</strong> Hai il diritto di opporti e impedire
          qualsiasi decisione che potrebbe avere un effetto legale o similmente significativo su di te basata esclusivamente
          su processi automatizzati. Questo diritto è limitato se la decisione è necessaria per l'esecuzione di qualsiasi
          contratto tra te e noi, è consentita dalla legge applicabile o si basa sul tuo esplicito consenso.
        </li>
        <li>
          <strong>Diritto alla non discriminazione.</strong> Non ti addebiteremo e non ti addebiteremo mai un importo diverso
          per l'utilizzo dei nostri prodotti, non ti offriremo sconti diversi e non ti forniremo un livello inferiore di servizio
          clienti perché hai esercitato i tuoi diritti sulla privacy dei dati. Tuttavia, l'esercizio di determinati diritti
          potrebbe, in virtù del loro esercizio, impedirti di utilizzare i nostri Servizi.
        </li>
      </ul>
      <p>
        Tieni presente che alcune informazioni potrebbero essere esenti da tali richieste ai sensi della legge
        applicabile. Ad esempio, abbiamo bisogno di conservare alcune informazioni per fornirti i nostri servizi.
      </p>
      <p>
        In alcuni casi, potremmo anche dover adottare misure ragionevoli per verificare la tua identità prima di
        rispondere a una richiesta, che potrebbero includere, come minimo, a seconda della sensibilità delle
        informazioni richieste e del tipo di richiesta che stai facendo, la verifica del tuo nome e indirizzo email. Se
        non siamo in grado di verificarti, potremmo non essere in grado di rispondere alle tue richieste. Se hai domande
        sull'esercizio di questi diritti o hai bisogno di assistenza, ti preghiamo di <a href={contactLink}
          >contattarci</a
        >. Se un agente autorizzato corrisponde per tuo conto, avremo bisogno del consenso scritto con firma del
        titolare dell'account prima di procedere.
      </p>
      <p>
        A seconda della legge applicabile, potresti avere il diritto di appellarti alla nostra decisione di negare la
        tua richiesta, se applicabile. Forniremo informazioni su come esercitare tale diritto nella nostra risposta che
        nega la richiesta. Hai anche il diritto di presentare un reclamo presso un'autorità di controllo. Se ti trovi
        nell'UE o nel Regno Unito, puoi contattare la tua autorità per la protezione dei dati per presentare un reclamo
        o saperne di più sulle leggi locali sulla privacy.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="california-privacy-rights">Diritti sulla privacy in California</h2>
      <p>
        Se sei residente in California, hai diritti aggiuntivi ai sensi del California Consumer Privacy Act (CCPA). Non
        vendiamo né condividiamo le tue informazioni personali come definito dal CCPA. Per le categorie di informazioni
        personali che raccogliamo e le nostre finalità, consulta la sezione "Cosa raccogliamo e perché" sopra.
      </p>
      <p>
        Ai sensi della legge californiana "Shine the Light", non divulghiamo informazioni personali a terzi per le loro
        finalità di marketing diretto.
      </p>
      <p>
        Se hai domande sull'esercizio dei tuoi diritti sulla privacy in California,
        <a href={contactLink}>contattaci</a>.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="how-we-secure-your-data">Come proteggiamo i tuoi dati</h2>
      <p>
        Tutti i dati sono crittografati tramite <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security"
          >SSL/TLS</a>
        quando vengono trasmessi dai nostri server al tuo browser. Anche i backup del database sono crittografati. Facciamo
        di tutto per proteggere i tuoi dati a riposo.
      </p>
      <p>
        La maggior parte dei dati non è crittografata mentre risiede nel nostro database (poiché devono essere pronti
        per essere inviati a te quando ne hai bisogno).
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="data-retention">Conservazione dei dati</h2>
      <p>
        Conserviamo le tue informazioni per il tempo necessario agli scopi per cui vengono elaborate. La durata della
        conservazione delle informazioni dipende dagli scopi per cui le abbiamo raccolte e le utilizziamo e dalle tue
        scelte, dopodiché potremmo eliminarle e/o aggregarle. Potremmo anche conservare e utilizzare queste informazioni
        come necessario per adempiere ai nostri obblighi legali, risolvere controversie e far valere i nostri accordi.
        Attraverso questa informativa, abbiamo fornito periodi di conservazione specifici per determinati tipi di
        informazioni.
      </p>
      {#if googleAnalytics}
        <p>I dati di Google Analytics vengono conservati per 2 mesi.</p>
      {/if}
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="cookies">Cookie</h2>
      <p>
        Utilizziamo cookie essenziali necessari per il corretto funzionamento del sito web. Questi includono cookie per
        scopi di sicurezza{#if hasTracking}
          e per memorizzare le tue preferenze di consenso ai cookie{/if}.
      </p>
      {#if googleAnalytics}
        <h3>Cookie analitici</h3>
        <p>
          Con il tuo consenso, utilizziamo Google Analytics per comprendere come i visitatori interagiscono con il
          nostro sito web. Google Analytics utilizza cookie per raccogliere informazioni come:
        </p>
        <ul>
          <li>Le pagine che visiti e quanto tempo trascorri su di esse</li>
          <li>Come sei arrivato sul nostro sito (fonte di riferimento)</li>
          <li>La tua posizione geografica generale (livello paese/città)</li>
          <li>Il tipo di dispositivo, browser e sistema operativo</li>
        </ul>
        <p>
          Questi dati sono aggregati e anonimizzati. Li utilizziamo per migliorare il nostro sito web e capire quali
          contenuti sono più utili ai visitatori.
        </p>
        <p>
          Per maggiori informazioni su come Google elabora questi dati, consulta l'<a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener">Informativa sulla privacy di Google</a
          >.
        </p>
      {/if}
      {#if hasAds}
        <h3>Cookie pubblicitari e di tracciamento</h3>
        {#if googleAds}
          <p>
            Con il tuo consenso, utilizziamo Google Ads per misurare l'efficacia delle nostre campagne pubblicitarie e
            per fornire annunci pertinenti. Google Ads può utilizzare cookie per tracciare le conversioni (azioni che
            compi dopo aver cliccato su un annuncio) e per mostrarti annunci personalizzati in base alla tua attività di
            navigazione.
          </p>
          <p>
            Per maggiori informazioni, consulta l'<a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener">Informativa sulla privacy di Google</a>
            e le
            <a href="https://adssettings.google.com" target="_blank" rel="noopener">Impostazioni annunci di Google</a>.
          </p>
        {/if}
        {#if metaPixel}
          <p>
            Con il tuo consenso, utilizziamo il Pixel Meta (Facebook/Instagram) e l'API Conversions per misurare
            l'efficacia della nostra pubblicità e fornire annunci pertinenti. Il tracciamento Meta può raccogliere
            informazioni sulle tue interazioni con il nostro sito web, incluse le pagine visitate e le azioni
            effettuate. Questi dati possono essere inviati a Meta sia tramite cookie del browser (Pixel) sia tramite
            comunicazione server-to-server (API Conversions).
          </p>
          <p>
            Per maggiori informazioni, consulta l'<a
              href="https://www.facebook.com/privacy/policy/"
              target="_blank"
              rel="noopener">Informativa sulla privacy di Meta</a
            >.
          </p>
        {/if}
      {/if}
      <h3>Gestione delle preferenze sui cookie</h3>
      {#if hasTracking}
        <p>
          Quando visiti il nostro sito per la prima volta, vedrai un banner di consenso ai cookie dove puoi scegliere
          quali tipi di cookie accettare. Puoi modificare le tue preferenze in qualsiasi momento cliccando sull'icona
          del cookie nell'angolo della pagina.
        </p>
      {/if}
      <p>
        Puoi anche gestire o disabilitare i cookie attraverso le impostazioni del tuo browser. La maggior parte dei
        browser ti consente di bloccare o eliminare i cookie, anche se questo potrebbe influire sulla funzionalità del
        sito web.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="location-of-site-and-data">Ubicazione del sito e dei dati</h2>
      <p>
        I nostri siti web e servizi, incluso {websiteDomain} e i suoi sottodomini, sono gestiti con infrastruttura negli Stati
        Uniti e nell'Unione Europea. Se ti trovi altrove,
        <strong
          >tieni presente che qualsiasi informazione ci fornisci verrà trasferita e archiviata in queste località</strong
        >. Utilizzando i nostri siti web o Servizi e/o fornendoci le tue informazioni personali, acconsenti a questo
        trasferimento.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="when-transferring-personal-data-from-the-eu">Trasferimento dei dati personali dall'UE</h2>
      <p>
        Il Comitato Europeo per la Protezione dei Dati (EDPB) ha emanato linee guida secondo cui i dati personali
        trasferiti al di fuori dell'UE devono essere trattati con lo stesso livello di protezione garantito dalla
        normativa europea sulla privacy. La legge del Regno Unito prevede garanzie simili per i dati degli utenti del
        Regno Unito trasferiti al di fuori del Regno Unito. Di conseguenza, {companyName} ha adottato misure appropriate per
        contribuire a garantire questa protezione.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="changes-and-questions">Modifiche e domande</h2>
      <p>
        Potremmo aggiornare questa informativa secondo necessità per conformarci alle normative pertinenti e riflettere
        eventuali nuove pratiche. Ogni volta che apportiamo una modifica significativa alle nostre politiche,
        aggiorneremo la data in cima a questa pagina e adotteremo altre misure appropriate per notificare gli utenti.
      </p>
      <p>
        Hai domande, commenti o dubbi su questa informativa sulla privacy, sui tuoi dati o sui tuoi diritti relativi
        alle tue informazioni? <a href={contactLink}>Contattaci</a>, e saremo lieti di provare a risponderti!
      </p>
      <p style="font-size: 12px; color: #666; margin-top: 2rem;">
        Adattato dalle politiche open-source di Basecamp / <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          style="color: #666; text-decoration: none;">CC BY 4.0</a
        >.
      </p>
    </div>
  </section>
</div>
