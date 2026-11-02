<script lang="ts">
  // Original Terms Template: https://github.com/basecamp/policies/blob/master/terms/index.md?plain=1

  interface Props {
    /** Company the terms belong to. */
    companyName: string;
    /** Paths to the pages referenced in the terms. */
    links: Record<"home" | "privacy" | "contact" | "about" | "services", string>;
    /** Date the terms were last updated. */
    updated: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }
  let { companyName, links, updated, style }: Props = $props();
</script>

<div class="terms standard" id="terms-page-id" {style}>
  <section>
    <div class="inner-container">
      <h1>Termini di Servizio</h1>
      <hr />
      <p class="last-updated"><em>Ultimo aggiornamento: {updated}</em></p>
      <p>
        Da parte di tutti noi di {companyName}, ti ringraziamo sinceramente per aver utilizzato i nostri servizi! Li
        abbiamo creati per supportarti nella costruzione del tuo business online. Anche se ci piacerebbe conoscere
        personalmente ciascuno dei nostri clienti, ci affidiamo ai nostri Termini di Servizio per garantire che tutto
        funzioni senza problemi per tutti.
      </p>
      <p>
        Quando diciamo "Azienda", "noi", "nostro" o "ci" in questo documento, ci riferiamo a <a href={links.home}
          >{companyName}</a
        >.
      </p>
      <p>
        Quando diciamo "Servizi", intendiamo skywalklab.com, i suoi sottodomini e qualsiasi prodotto creato e mantenuto
        da {companyName}. Ciò include qualsiasi servizio di {companyName}, sia che venga fornito tramite un browser web,
        un'applicazione desktop, un'applicazione mobile o un altro formato.
      </p>
      <p>Quando diciamo "Tu" o "tuo", ci riferiamo alle persone o organizzazioni che utilizzano i nostri Servizi.</p>
      <p>
        Potremmo aggiornare questi Termini di Servizio in futuro. Ogni volta che apportiamo una modifica significativa
        alle nostre politiche, aggiorneremo la data in cima a questa pagina e adotteremo altre misure appropriate per
        notificare i clienti.
      </p>
      <p>
        Quando utilizzi i nostri Servizi, ora o in futuro, accetti gli ultimi Termini. Potrebbero esserci momenti in cui
        non esercitiamo o applichiamo un diritto o una disposizione dei Termini; tuttavia, ciò non significa che stiamo
        rinunciando a tale diritto o disposizione. <strong
          >Questi Termini contengono una limitazione della nostra responsabilità.</strong>
      </p>
      <p>
        Se violi uno qualsiasi dei Termini, potremmo interrompere i nostri servizi. Questa è un'affermazione ampia e
        significa che devi riporre molta fiducia in noi. Facciamo del nostro meglio per meritare quella fiducia essendo
        trasparenti su <a href={links.about}>chi siamo</a>,
        <a href={links.services}>come lavoriamo</a>, e mantenendo una porta aperta per il tuo
        <a href={links.contact}>feedback</a>.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Termini del Servizio</h2>
      <ol>
        <li>
          Sei responsabile del mantenimento della sicurezza di tutti gli account e le password associati ai progetti che
          costruiamo per te, e di garantire che anche i tuoi utenti facciano lo stesso. L'Azienda non può e non sarà
          responsabile per eventuali perdite o danni derivanti dal mancato rispetto di questo obbligo di sicurezza.
        </li>
        <li>
          Sei responsabile di tutti i contenuti aggiunti e delle attività che si verificano sui siti web o applicazioni
          che costruiamo per te, inclusi i contenuti aggiunti e le attività di qualsiasi utente.
        </li>
        <li>
          Devi essere una persona fisica. Gli account registrati da "bot" o altri metodi automatizzati non sono
          consentiti.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Pagamento, Rimborsi e Modifiche al Piano</h2>
      <ol>
        <li>
          Per i Servizi a pagamento, spieghiamo i prezzi e i termini di pagamento quando utilizzi i nostri servizi. I
          termini di pagamento vengono concordati prima dell'inizio del lavoro.
        </li>
        <li>
          Se hai un piano mensile, devi pagare in anticipo per continuare a utilizzare il Servizio. Se non paghi,
          sospenderemo i servizi fino alla ricezione del pagamento.
        </li>
        <li>
          Tutte le tariffe sono al netto di tutte le tasse, imposte o dazi imposti dalle autorità fiscali. Ove
          richiesto, raccoglieremo tali tasse per conto dell'autorità fiscale e le verseremo alle autorità fiscali. In
          caso contrario, sei responsabile del pagamento di tutte le tasse, imposte o dazi.
        </li>
        <li>Elaboriamo i rimborsi caso per caso in base al nostro accordo con te.</li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Cancellazione e Risoluzione</h2>
      <ol>
        <li>
          Sei l'unico responsabile della corretta cancellazione dei tuoi servizi. Se hai bisogno di aiuto per
          cancellare, puoi sempre contattare il nostro <a href={links.contact}>team di Supporto</a>.
        </li>
        <li>
          In caso di cancellazione dei servizi mensili, il tuo sito web o applicazione rimarrà accessibile fino alla
          fine del periodo pagato. Successivamente, i servizi saranno sospesi fino alla ripresa del pagamento o alla
          definizione di accordi alternativi.
        </li>
        <li>
          Se cancelli il Servizio prima della fine del mese corrente già pagato, la cancellazione avrà effetto alla fine
          del periodo di fatturazione e non ti verrà più addebitato nulla.
        </li>
        <li>
          Abbiamo il diritto di sospendere o interrompere i servizi e rifiutare qualsiasi uso attuale o futuro dei
          nostri Servizi per qualsiasi motivo in qualsiasi momento. La sospensione significa che il tuo sito web o
          applicazione non sarà accessibile. Ci riserviamo il diritto di rifiutare l'uso dei Servizi a chiunque per
          qualsiasi motivo in qualsiasi momento. Ci sono alcune cose contro cui ci opponiamo fermamente e questa
          clausola è il modo in cui esercitiamo tale posizione.
        </li>
        <li>
          Abusi verbali, fisici, scritti o di altro tipo (incluse minacce di abuso o ritorsione) nei confronti di un
          dipendente o funzionario dell'Azienda comporteranno la risoluzione immediata del servizio.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Modifiche al Servizio e ai Prezzi</h2>
      <ol>
        <li>
          Facciamo una promessa ai nostri clienti di supportare i nostri Servizi. Ciò significa che quando si tratta di
          sicurezza, privacy e assistenza clienti, continueremo a mantenere tutti i servizi che forniamo. A volte
          diventa tecnicamente impossibile continuare una funzionalità o riprogettare una parte dei nostri Servizi
          perché pensiamo che potrebbe essere migliore. Ci riserviamo il diritto in qualsiasi momento di modificare o
          interrompere, temporaneamente o permanentemente, qualsiasi parte dei nostri Servizi con ragionevole preavviso.
        </li>
        <li>
          A volte modifichiamo la struttura dei prezzi per i nostri servizi. Quando lo facciamo, tendiamo a esentare i
          clienti esistenti da tali modifiche. Tuttavia, potremmo scegliere di modificare i prezzi per i clienti
          esistenti. In tal caso, daremo un preavviso di almeno 30 giorni e ti avviseremo tramite l'indirizzo email
          registrato.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Disponibilità, Sicurezza e Privacy</h2>
      <ol>
        <li>
          L'utilizzo dei Servizi è a tuo esclusivo rischio. Forniamo questi Servizi "così come sono" e "come
          disponibili". Non offriamo accordi sul livello di servizio per la maggior parte dei nostri Servizi, ma
          prendiamo seriamente la disponibilità delle nostre applicazioni.
        </li>
        <li>
          Ci riserviamo il diritto di disabilitare temporaneamente i servizi se l'utilizzo supera significativamente i
          livelli normali. Naturalmente, ti contatteremo prima di intraprendere qualsiasi azione, tranne nei rari casi
          in cui il livello di utilizzo potrebbe influire negativamente sulle prestazioni del Servizio per altri
          clienti.
        </li>
        <li>
          Adottiamo molte misure per proteggere e mettere in sicurezza i tuoi dati attraverso backup, ridondanze e
          crittografia. Imponiamo la crittografia per la trasmissione dei dati dalla rete Internet pubblica.
        </li>
        <li>
          Quando utilizzi i nostri Servizi, ci affidi i tuoi dati. Prendiamo a cuore quella fiducia. Accetti che
          {companyName} possa elaborare i tuoi dati come descritto nella nostra
          <a href={links.privacy}>Informativa sulla Privacy</a> e per nessun altro scopo. Noi come esseri umani possiamo accedere
          ai tuoi dati per i seguenti motivi:
        </li>
      </ol>
      <ul>
        <li>
          <strong>Per aiutarti con le richieste di supporto che fai.</strong> Chiederemo il consenso esplicito prima di accedere
          ai tuoi dati.
        </li>
        <li>
          <strong
            >Nelle rare occasioni in cui si verifica un errore che interrompe un processo automatizzato a metà.</strong>
          Riceviamo avvisi automatici quando si verificano tali errori. Quando possiamo risolvere il problema e riavviare
          l'elaborazione automatizzata senza visualizzare dati personali, lo facciamo. In rari casi, dobbiamo esaminare una
          quantità minima di dati personali per risolvere il problema. In questi rari casi, miriamo a correggere la causa
          principale per evitare che gli errori si ripetano.
        </li>
        <li>
          <strong>Per salvaguardare {companyName}.</strong> Esamineremo i log e i metadati come parte del nostro lavoro per
          garantire la sicurezza dei tuoi dati e dei Servizi nel loro complesso. Se necessario, potremmo anche accedere ai
          dati come parte di un'indagine su segnalazioni di abusi.
        </li>
        <li>
          <strong>Nella misura richiesta dalla legge applicabile.</strong> Come azienda con infrastruttura dati situata
          negli Stati Uniti e nell'UE, conserviamo o condividiamo i dati dei clienti solo se obbligati da un'autorità
          governativa con un ordine legalmente vincolante o una richiesta appropriata. È politica di {companyName}
          notificare i clienti interessati prima di divulgare i dati, a meno che non ci sia legalmente vietato farlo.
        </li>
      </ul>
      <ol start="5">
        <li>
          Utilizziamo fornitori terzi e partner di hosting per fornire l'hardware, il software, la rete, lo storage e la
          tecnologia correlata necessari per gestire skywalklab.com, i suoi sottodomini e i Servizi.
        </li>
        <li>
          Ai sensi del California Consumer Privacy Act ("CCPA"), {companyName} è un "fornitore di servizi", non un'"azienda"
          o una "terza parte", in relazione al tuo utilizzo dei Servizi. Ciò significa che elaboriamo tutti i dati che condividi
          con noi solo per lo scopo per cui ti sei registrato e come descritto in questi Termini e nell'<a
            href={links.privacy}>Informativa sulla Privacy</a
          >. Non conserviamo, utilizziamo, divulghiamo o vendiamo nessuna di tali informazioni per altri scopi
          commerciali a meno che non abbiamo il tuo esplicito permesso. E d'altra parte, accetti di rispettare i tuoi
          requisiti ai sensi del CCPA e di non utilizzare i Servizi di {companyName} in modo da violare i regolamenti.
        </li>
        <li>
          Questi Termini aderiscono al Regolamento Generale sulla Protezione dei Dati dell'UE ("GDPR") e al Regolamento
          Generale sulla Protezione dei Dati del Regno Unito ("UK GDPR") e si applicano al tuo utilizzo dei servizi di
          {companyName}.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Copyright e Proprietà dei Contenuti</h2>
      <ol>
        <li>Tutti i contenuti pubblicati sui Servizi devono essere conformi alla legge sul copyright applicabile.</li>
        <li>
          Ci concedi una licenza limitata per utilizzare i contenuti pubblicati da te e dai tuoi utenti al fine di
          fornirti i Servizi, ma non rivendichiamo alcun diritto di proprietà su tali materiali. Tutti i materiali che
          invii ai Servizi rimangono tuoi.
        </li>
        <li>
          Non effettuiamo una pre-selezione dei contenuti, ma ci riserviamo il diritto (ma non l'obbligo) a nostra
          esclusiva discrezione di rifiutare o rimuovere qualsiasi contenuto disponibile tramite il Servizio.
        </li>
        <li>
          L'Azienda o i suoi licenziatari possiedono tutti i diritti, titoli e interessi sui Servizi, inclusi tutti i
          diritti di proprietà intellettuale in essi contenuti, e non ottieni alcun diritto di proprietà sui Servizi in
          seguito al loro utilizzo. Non puoi duplicare, copiare o riutilizzare alcuna parte degli elementi HTML, CSS,
          JavaScript o di design visivo senza espressa autorizzazione scritta dell'Azienda. Devi richiedere
          l'autorizzazione per utilizzare i loghi dell'Azienda o qualsiasi logo del Servizio per scopi promozionali.
          Inviaci via email le richieste di utilizzo dei loghi. Ci riserviamo il diritto di revocare qualsiasi
          autorizzazione se violi questi Termini.
        </li>
        <li>
          Accetti di non riprodurre, duplicare, copiare, vendere, rivendere o sfruttare alcuna parte dei Servizi,
          l'utilizzo dei Servizi o l'accesso ai Servizi senza l'espressa autorizzazione scritta dell'Azienda.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Funzionalità e Bug</h2>
      <p>
        Progettiamo i nostri Servizi con cura, basandoci sulla nostra esperienza e sulle esperienze dei clienti che
        condividono il loro tempo e feedback. Tuttavia, non esiste un servizio che piaccia a tutti. Non garantiamo che i
        nostri Servizi soddisfino le tue specifiche esigenze o aspettative.
      </p>
      <p>
        Testiamo anche tutte le nostre funzionalità in modo approfondito prima di rilasciarle. Come con qualsiasi
        software, i nostri Servizi hanno inevitabilmente alcuni bug. Monitoriamo i bug che ci vengono segnalati e
        lavoriamo su quelli prioritari, specialmente quelli relativi alla sicurezza o alla privacy. Non tutti i bug
        segnalati verranno corretti e non garantiamo Servizi completamente privi di errori.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Responsabilità</h2>
      <p>Menzioniamo la responsabilità in tutto questi Termini, ma per inserirla tutta in una sezione:</p>
      <p>
        <em
          ><strong
            >Comprendi e accetti espressamente che l'Azienda non sarà responsabile, per legge o in equità, nei tuoi
            confronti o nei confronti di terzi per danni diretti, indiretti, incidentali, perdita di profitti, speciali,
            consequenziali, punitivi o esemplari, inclusi, ma non limitati a, danni per perdita di profitti, avviamento,
            uso, dati o altre perdite intangibili (anche se l'Azienda è stata informata della possibilità di tali
            danni), derivanti da: (i) l'uso o l'impossibilità di utilizzare i Servizi; (ii) il costo di
            approvvigionamento di beni e servizi sostitutivi derivanti da beni, dati, informazioni o servizi acquistati
            o ottenuti o messaggi ricevuti o transazioni effettuate attraverso o dai Servizi; (iii) accesso non
            autorizzato o alterazione delle tue trasmissioni o dati; (iv) dichiarazioni o condotta di terzi sul
            servizio; (v) o qualsiasi altra questione relativa a questi Termini o ai Servizi, sia come violazione del
            contratto, illecito civile (inclusa negligenza attiva o passiva), o qualsiasi altra teoria di
            responsabilità.</strong
          ></em>
      </p>
      <p>
        Utilizzando i servizi di {companyName}, incluso skywalklab.com e i suoi sottodomini, riponi la tua fiducia in
        noi — e noi non lo prendiamo alla leggera. Anche se non possiamo garantire che tutto andrà sempre perfettamente,
        ci impegniamo a rendere {companyName} una scelta solida attraverso una gestione attenta, una sicurezza robusta, un'infrastruttura
        affidabile e una profonda passione per ciò che facciamo. Ti ringraziamo per aver scelto {companyName} per supportare
        la tua attività.
      </p>
      <p>
        Se hai domande su uno qualsiasi di questi Termini, contatta il nostro <a href={links.contact}
          >team di Supporto</a
        >.
      </p>
    </div>
  </section>

  <section>
    <div class="inner-container">
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
