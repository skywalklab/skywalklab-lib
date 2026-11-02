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
      <h1>Conditions d'utilisation</h1>
      <hr />
      <p class="last-updated"><em>Dernière mise à jour : {updated}</em></p>
      <p>
        De la part de toute l'équipe de {companyName}, nous vous remercions sincèrement d'utiliser nos services ! Nous
        les avons créés pour vous accompagner dans le développement de votre activité en ligne. Bien que nous aimerions
        connaître personnellement chacun de nos clients, nous nous appuyons sur nos Conditions d'utilisation pour
        garantir que tout fonctionne bien pour tous.
      </p>
      <p>
        Lorsque nous disons « Société », « nous », « notre » ou « nos » dans ce document, nous faisons référence à <a
          href={links.home}>{companyName}</a
        >.
      </p>
      <p>
        Lorsque nous disons « Services », nous entendons skywalklab.com, ses sous-domaines et tout produit créé et
        maintenu par {companyName}. Cela inclut tout service {companyName}, qu'il soit fourni dans un navigateur web,
        une application de bureau, une application mobile ou un autre format.
      </p>
      <p>
        Lorsque nous disons « Vous » ou « votre », nous faisons référence aux personnes ou organisations qui utilisent
        nos Services.
      </p>
      <p>
        Nous pouvons mettre à jour ces Conditions d'utilisation à l'avenir. Chaque fois que nous apportons une
        modification significative à nos politiques, nous actualiserons la date en haut de cette page et prendrons toute
        autre mesure appropriée pour notifier les clients.
      </p>
      <p>
        Lorsque vous utilisez nos Services, maintenant ou à l'avenir, vous acceptez les dernières Conditions. Il peut
        arriver que nous n'exercions pas ou n'appliquions pas un droit ou une disposition des Conditions ; cependant,
        cela ne signifie pas que nous renonçons à ce droit ou à cette disposition. <strong
          >Ces Conditions contiennent une limitation de notre responsabilité.</strong>
      </p>
      <p>
        Si vous violez l'une des Conditions, nous pouvons résilier nos services. C'est une déclaration large et cela
        signifie que vous devez nous accorder beaucoup de confiance. Nous faisons de notre mieux pour mériter cette
        confiance en étant transparents sur <a href={links.about}>qui nous sommes</a>,
        <a href={links.services}>comment nous travaillons</a>, et en restant ouverts à vos
        <a href={links.contact}>commentaires</a>.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Conditions de service</h2>
      <ol>
        <li>
          Vous êtes responsable du maintien de la sécurité de tous les comptes et mots de passe associés aux projets que
          nous construisons pour vous, et de vous assurer que vos utilisateurs font de même. La Société ne peut pas et
          ne sera pas tenue responsable de toute perte ou dommage résultant de votre non-respect de cette obligation de
          sécurité.
        </li>
        <li>
          Vous êtes responsable de tout le contenu ajouté et de toute activité qui se produit sur les sites web ou
          applications que nous construisons pour vous, y compris le contenu ajouté par et l'activité de tous les
          utilisateurs.
        </li>
        <li>
          Vous devez être un humain. Les comptes enregistrés par des « bots » ou d'autres méthodes automatisées ne sont
          pas autorisés.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Paiement, remboursements et modifications de forfait</h2>
      <ol>
        <li>
          Pour les Services payants, nous expliquons les tarifs et les conditions de paiement lorsque vous engagez nos
          services. Les conditions de paiement sont convenues avant le début des travaux.
        </li>
        <li>
          Si vous êtes sur un forfait mensuel, vous devez payer à l'avance pour continuer à utiliser le Service. Si vous
          ne payez pas, nous suspendrons les services jusqu'à réception du paiement.
        </li>
        <li>
          Tous les frais sont hors taxes, prélèvements ou droits imposés par les autorités fiscales. Le cas échéant,
          nous collecterons ces taxes pour le compte de l'autorité fiscale et les reverserons aux autorités fiscales.
          Sinon, vous êtes responsable du paiement de toutes les taxes, prélèvements ou droits.
        </li>
        <li>Nous traitons les remboursements au cas par cas conformément à notre accord avec vous.</li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Annulation et résiliation</h2>
      <ol>
        <li>
          Vous êtes seul responsable de l'annulation correcte de vos services. Si vous avez besoin d'aide pour annuler,
          vous pouvez toujours contacter notre <a href={links.contact}>équipe de support</a>.
        </li>
        <li>
          En cas d'annulation des services mensuels, votre site web ou application restera accessible jusqu'à la fin de
          la période payée. Après cela, les services seront suspendus jusqu'à la reprise du paiement ou la mise en place
          d'arrangements alternatifs.
        </li>
        <li>
          Si vous annulez le Service avant la fin de votre mois en cours payé, votre annulation prendra effet à la fin
          de la période de facturation, et vous ne serez plus facturé.
        </li>
        <li>
          Nous avons le droit de suspendre ou de résilier les services et de refuser toute utilisation actuelle ou
          future de nos Services pour quelque raison que ce soit à tout moment. La suspension signifie que votre site
          web ou application ne sera pas accessible. Nous nous réservons le droit de refuser l'utilisation des Services
          à quiconque pour quelque raison que ce soit à tout moment. Il y a certaines choses contre lesquelles nous nous
          opposons fermement et cette clause est la façon dont nous exerçons cette position.
        </li>
        <li>
          Tout abus verbal, physique, écrit ou autre (y compris les menaces d'abus ou de représailles) envers un employé
          ou un dirigeant de la Société entraînera la résiliation immédiate du service.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Modifications du Service et des prix</h2>
      <ol>
        <li>
          Nous faisons la promesse à nos clients de soutenir nos Services. Cela signifie qu'en matière de sécurité, de
          confidentialité et de support client, nous continuerons à maintenir tous les services que nous fournissons.
          Parfois, il devient techniquement impossible de continuer une fonctionnalité ou nous reconçevons une partie de
          nos Services parce que nous pensons qu'elle pourrait être meilleure. Nous nous réservons le droit à tout
          moment de modifier ou d'interrompre, temporairement ou définitivement, toute partie de nos Services avec un
          préavis raisonnable.
        </li>
        <li>
          Parfois, nous modifions la structure tarifaire de nos services. Lorsque nous le faisons, nous avons tendance à
          exempter les clients existants de ces changements. Cependant, nous pouvons choisir de modifier les prix pour
          les clients existants. Si nous le faisons, nous donnerons un préavis d'au moins 30 jours et vous en
          informerons via l'adresse e-mail enregistrée.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Disponibilité, sécurité et confidentialité</h2>
      <ol>
        <li>
          Votre utilisation des Services est à vos seuls risques. Nous fournissons ces Services « en l'état » et « selon
          disponibilité ». Nous n'offrons pas d'accords de niveau de service pour la plupart de nos Services — mais nous
          prenons la disponibilité de nos applications au sérieux.
        </li>
        <li>
          Nous nous réservons le droit de désactiver temporairement les services si l'utilisation dépasse
          significativement les niveaux normaux. Bien sûr, nous vous contacterons avant de prendre toute mesure, sauf
          dans les rares cas où le niveau d'utilisation pourrait avoir un impact négatif sur les performances du Service
          pour d'autres clients.
        </li>
        <li>
          Nous prenons de nombreuses mesures pour protéger et sécuriser vos données grâce aux sauvegardes, aux
          redondances et au chiffrement. Nous appliquons le chiffrement pour la transmission des données depuis
          l'Internet public.
        </li>
        <li>
          Lorsque vous utilisez nos Services, vous nous confiez vos données. Nous prenons cette confiance à cœur. Vous
          acceptez que {companyName} puisse traiter vos données comme décrit dans notre
          <a href={links.privacy}>Politique de confidentialité</a> et à aucune autre fin. En tant qu'êtres humains, nous pouvons
          accéder à vos données pour les raisons suivantes :
        </li>
      </ol>
      <ul>
        <li>
          <strong>Pour vous aider avec les demandes de support que vous faites.</strong> Nous demanderons un consentement
          explicite avant d'accéder à vos données.
        </li>
        <li>
          <strong
            >Dans les rares occasions où une erreur se produit qui interrompt un processus automatisé en cours de route.</strong>
          Nous recevons des alertes automatisées lorsque de telles erreurs se produisent. Lorsque nous pouvons résoudre le
          problème et redémarrer le traitement automatisé sans examiner de données personnelles, nous le faisons. Dans de
          rares cas, nous devons examiner une quantité minimale de données personnelles pour résoudre le problème. Dans ces
          rares cas, nous visons à corriger la cause profonde pour éviter que les erreurs ne se reproduisent.
        </li>
        <li>
          <strong>Pour protéger {companyName}.</strong> Nous examinerons les journaux et les métadonnées dans le cadre de
          notre travail pour assurer la sécurité de vos données et des Services dans leur ensemble. Si nécessaire, nous pouvons
          également accéder aux données dans le cadre d'une enquête sur un signalement d'abus.
        </li>
        <li>
          <strong>Dans la mesure requise par la loi applicable.</strong> En tant qu'entreprise avec une infrastructure
          de données située aux États-Unis et dans l'UE, nous ne conservons ni ne partageons les données des clients que
          si nous y sommes contraints par une autorité gouvernementale avec une ordonnance juridiquement contraignante
          ou une demande appropriée. La politique de {companyName} est de notifier les clients concernés avant de divulguer
          des données, sauf si nous en sommes légalement interdits.
        </li>
      </ul>
      <ol start="5">
        <li>
          Nous utilisons des fournisseurs tiers et des partenaires d'hébergement pour fournir le matériel, les
          logiciels, le réseau, le stockage et la technologie connexe nécessaires pour faire fonctionner skywalklab.com,
          ses sous-domaines et les Services.
        </li>
        <li>
          En vertu du California Consumer Privacy Act (« CCPA »), {companyName} est un « prestataire de services », et non
          une « entreprise » ou un « tiers », en ce qui concerne votre utilisation des Services. Cela signifie que nous traitons
          toutes les données que vous partagez avec nous uniquement dans le but pour lequel vous vous êtes inscrit et comme
          décrit dans ces Conditions et la
          <a href={links.privacy}>Politique de confidentialité</a>. Nous ne conservons, n'utilisons, ne divulguons ni ne
          vendons aucune de ces informations à d'autres fins commerciales sans votre permission explicite. Et
          inversement, vous acceptez de vous conformer à vos obligations en vertu du CCPA et de ne pas utiliser les
          Services de {companyName} d'une manière qui viole les réglementations.
        </li>
        <li>
          Ces Conditions respectent le Règlement général sur la protection des données de l'UE (« RGPD ») et le
          Règlement général sur la protection des données du Royaume-Uni (« RGPD UK ») et s'appliquent à votre
          utilisation des services {companyName}.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Droits d'auteur et propriété du contenu</h2>
      <ol>
        <li>
          Tout contenu publié sur les Services doit être conforme à la législation applicable sur le droit d'auteur.
        </li>
        <li>
          Vous nous accordez une licence limitée pour utiliser le contenu publié par vous et vos utilisateurs afin de
          vous fournir les Services, mais nous ne revendiquons aucun droit de propriété sur ces matériaux. Tous les
          matériaux que vous soumettez aux Services restent les vôtres.
        </li>
        <li>
          Nous ne filtrons pas préalablement le contenu, mais nous nous réservons le droit (mais pas l'obligation) à
          notre seule discrétion de refuser ou de supprimer tout contenu disponible via le Service.
        </li>
        <li>
          La Société ou ses concédants de licence détiennent tous les droits, titres et intérêts sur les Services, y
          compris tous les droits de propriété intellectuelle y afférents, et vous n'obtenez aucun droit de propriété
          sur les Services du fait de votre utilisation. Vous ne pouvez pas dupliquer, copier ou réutiliser une partie
          du HTML, CSS, JavaScript ou des éléments de conception visuelle sans l'autorisation écrite expresse de la
          Société. Vous devez demander l'autorisation d'utiliser les logos de la Société ou les logos de tout Service à
          des fins promotionnelles. Veuillez nous envoyer par e-mail vos demandes d'utilisation de logos. Nous nous
          réservons le droit de révoquer toute autorisation si vous violez ces Conditions.
        </li>
        <li>
          Vous acceptez de ne pas reproduire, dupliquer, copier, vendre, revendre ou exploiter toute partie des
          Services, l'utilisation des Services ou l'accès aux Services sans l'autorisation écrite expresse de la
          Société.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Fonctionnalités et bugs</h2>
      <p>
        Nous concevons nos Services avec soin, en nous basant sur notre propre expérience et les expériences des clients
        qui partagent leur temps et leurs commentaires. Cependant, il n'existe pas de service qui plaise à tout le
        monde. Nous ne garantissons pas que nos Services répondront à vos exigences ou attentes spécifiques.
      </p>
      <p>
        Nous testons également toutes nos fonctionnalités de manière approfondie avant de les déployer. Comme pour tout
        logiciel, nos Services comportent inévitablement quelques bugs. Nous suivons les bugs qui nous sont signalés et
        travaillons sur ceux qui sont prioritaires, en particulier ceux liés à la sécurité ou à la confidentialité. Tous
        les bugs signalés ne seront pas corrigés et nous ne garantissons pas des Services entièrement exempts d'erreurs.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Responsabilité</h2>
      <p>
        Nous mentionnons la responsabilité tout au long de ces Conditions, mais pour tout regrouper dans une seule
        section :
      </p>
      <p>
        <em
          ><strong
            >Vous comprenez et acceptez expressément que la Société ne sera pas responsable, en droit ou en équité,
            envers vous ou tout tiers pour tout dommage direct, indirect, accessoire, perte de profits, spécial,
            consécutif, punitif ou exemplaire, y compris, mais sans s'y limiter, les dommages pour perte de profits, de
            clientèle, d'utilisation, de données ou d'autres pertes intangibles (même si la Société a été informée de la
            possibilité de tels dommages), résultant de : (i) l'utilisation ou l'impossibilité d'utiliser les Services ;
            (ii) le coût d'acquisition de biens et services de substitution résultant de biens, données, informations ou
            services achetés ou obtenus ou de messages reçus ou de transactions conclues par ou à partir des Services ;
            (iii) l'accès non autorisé ou l'altération de vos transmissions ou données ; (iv) les déclarations ou la
            conduite de tout tiers sur le service ; (v) ou toute autre question relative à ces Conditions ou aux
            Services, que ce soit en tant que rupture de contrat, délit (y compris la négligence active ou passive), ou
            toute autre théorie de responsabilité.</strong
          ></em>
      </p>
      <p>
        En utilisant les services de {companyName}, y compris skywalklab.com et ses sous-domaines, vous nous accordez
        votre confiance — et nous ne prenons pas cela à la légère. Bien que nous ne puissions pas garantir que tout ira
        toujours parfaitement, nous nous engageons à faire de {companyName} un choix solide grâce à une gestion réfléchie,
        une sécurité robuste, une infrastructure fiable et une profonde passion pour ce que nous faisons. Nous vous remercions
        d'avoir choisi {companyName} pour soutenir votre entreprise.
      </p>
      <p>
        Si vous avez une question concernant l'une de ces Conditions, veuillez contacter notre <a href={links.contact}
          >équipe de support</a
        >.
      </p>
    </div>
  </section>

  <section>
    <div class="inner-container">
      <p style="font-size: 12px; color: #666; margin-top: 2rem;">
        Adapté des politiques open-source de Basecamp / <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          style="color: #666; text-decoration: none;">CC BY 4.0</a
        >.
      </p>
    </div>
  </section>
</div>
