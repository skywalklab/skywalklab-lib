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
    updated = "21 juillet 2026",
    style
  }: Props = $props();

  const hasAnalytics = $derived(googleAnalytics);
  const hasAds = $derived(googleAds || metaPixel);
  const hasTracking = $derived(hasAnalytics || hasAds);
</script>

<div class="privacy standard" id="privacy-page-id" {style}>
  <section>
    <div class="inner-container">
      <h1 id="privacy-policy">Politique de confidentialité</h1>
      <hr />
      <p class="last-updated"><em>Dernière mise à jour : {updated}</em></p>
      <p>
        La confidentialité de vos données — et ce sont vos données, pas les nôtres ! — est très importante pour nous.
        Dans cette politique, nous expliquons : quelles données nous collectons et pourquoi ; comment vos données sont
        traitées ; et vos droits concernant vos données. Nous promettons de ne jamais vendre vos données : nous ne
        l'avons jamais fait et ne le ferons jamais.
      </p>
      <p>
        Cette politique est divisée en sections. Pour votre commodité, les liens vers chacune de ces sections sont les
        suivants :
      </p>
      <ul>
        <li>
          <a href="#privacy-policy">Politique de confidentialité</a>
        </li>
        <li>
          <a href="#what-we-collect-and-why">Ce que nous collectons et pourquoi</a>
        </li>
        <li>
          <a href="#when-we-access-or-disclose-your-information"
            >Quand nous accédons à vos informations ou les divulguons</a>
        </li>
        <li>
          <a href="#your-rights-with-respect-to-your-information">Vos droits concernant vos informations</a>
        </li>
        <li>
          <a href="#california-privacy-rights">Droits de confidentialité en Californie</a>
        </li>
        <li>
          <a href="#how-we-secure-your-data">Comment nous sécurisons vos données</a>
        </li>
        <li>
          <a href="#data-retention">Conservation des données</a>
        </li>
        <li>
          <a href="#cookies">Cookies</a>
        </li>
        <li>
          <a href="#location-of-site-and-data">Emplacement du site et des données</a>
        </li>
        <li>
          <a href="#when-transferring-personal-data-from-the-eu"
            >Lors du transfert de données personnelles depuis l'UE</a>
        </li>
        <li>
          <a href="#changes-and-questions">Modifications et questions</a>
        </li>
      </ul>
      <p>
        Cette politique s'applique à tous les produits et services offerts par {companyName}, y compris ceux sur
        {websiteDomain} et ses sous-domaines.
      </p>
      <p>
        Cette politique s'applique à notre traitement des informations concernant les visiteurs du site, les clients
        potentiels et les clients (en relation avec leur acquisition des services et la gestion de leur relation avec
        {companyName}). Nous désignons collectivement ces catégories d'individus par « vous » tout au long de cette
        politique.
      </p>
      <p>
        Cependant, cette politique ne couvre pas les informations concernant les utilisateurs finaux d'un client que
        {companyName} reçoit d'un client, ou traite autrement pour le compte d'un client, dans le cadre des services fournis
        par {companyName} au client conformément à un accord de services applicable. {companyName} traite ces informations
        selon les instructions du client concerné, qui est le « responsable du traitement » ou l'« entreprise » (ou occupe
        un rôle similaire tel que défini dans les lois applicables sur la protection de la vie privée), comme décrit dans
        l'accord de services applicable entre ce client et {companyName}.
      </p>
      <p>
        Si vous êtes un utilisateur final d'un client et que vous avez des questions sur la façon dont vos informations
        sont collectées et traitées par les services, veuillez contacter l'organisation qui nous a fourni vos
        informations pour plus de renseignements.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="what-we-collect-and-why">Ce que nous collectons et pourquoi</h2>
      <p>
        Notre principe directeur est de ne collecter que ce dont nous avons besoin. Voici ce que cela signifie en
        pratique :
      </p>
      <h3>Identité et accès</h3>
      <p>
        Lorsque vous contactez {companyName} ou engagez nos services, nous demandons des informations d'identification telles
        que votre nom, votre adresse e-mail et éventuellement un nom d'entreprise. Cela nous permet de communiquer avec vous
        au sujet de votre projet et de vous envoyer des mises à jour importantes. Nous pouvons également vous envoyer des
        informations facultatives sur nos services de temps en temps. Avec votre consentement, nous vous enverrons notre newsletter
        et d'autres mises à jour.
      </p>
      <p>
        Nous ne vendrons jamais vos informations personnelles à des tiers, et nous n'utiliserons pas votre nom ou votre
        entreprise dans des déclarations marketing sans votre permission.
      </p>
      <h3>Informations de facturation</h3>
      <p>
        Si vous engagez des services {companyName} payants, il vous sera demandé de fournir vos informations de paiement et
        votre adresse de facturation. Les informations de carte de crédit sont soumises directement à notre processeur de
        paiement et ne transitent pas par les serveurs de {companyName}. Nous conservons un enregistrement de la
        transaction de paiement, y compris les 4 derniers chiffres du numéro de carte de crédit, à des fins d'historique
        de compte, de facturation et de support de facturation. Nous conservons votre adresse de facturation afin de
        pouvoir vous facturer le service, calculer les taxes de vente applicables, vous envoyer des factures et détecter
        les transactions frauduleuses par carte de crédit.
      </p>
      <h3>Interactions avec le site web</h3>
      <p>
        Nous collectons des informations de base sur votre activité de navigation pour comprendre comment les visiteurs
        utilisent notre site web. Cela inclut les versions de votre navigateur et de votre système d'exploitation, votre
        adresse IP et les pages web que vous avez visitées. Ces informations nous aident à améliorer notre site web et
        nos services.
      </p>
      <h3>Données générales de géolocalisation</h3>
      <p>
        Nous enregistrons l'adresse IP complète utilisée pour accéder à notre site web à des fins de sécurité et de
        prévention de la fraude.
      </p>
      <h3>Communications</h3>
      <p>
        Lorsque vous nous contactez via notre formulaire de contact ou par e-mail, nous collectons les informations que
        vous fournissez (nom, e-mail, contenu du message) afin de pouvoir répondre à votre demande et conserver des
        enregistrements de nos communications.
      </p>
      {#if klaviyo}
        <h3>Marketing par e-mail</h3>
        <p>
          Si vous vous abonnez à notre newsletter ou à nos e-mails marketing, nous utilisons Klaviyo pour gérer nos
          communications par e-mail. Klaviyo collecte votre adresse e-mail et suit la façon dont vous interagissez avec
          nos e-mails (comme les ouvertures et les clics) pour nous aider à améliorer nos communications. Vous pouvez
          vous désabonner à tout moment en utilisant le lien dans n'importe quel e-mail. Pour plus d'informations,
          consultez la <a href="https://www.klaviyo.com/legal/privacy/privacy-notice" target="_blank" rel="noopener"
            >Politique de confidentialité de Klaviyo</a
          >.
        </p>
      {/if}
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="when-we-access-or-disclose-your-information">Quand nous accédons à vos informations ou les divulguons</h2>
      <p>
        <strong>Pour fournir les produits ou services que vous avez demandés</strong>. Nous utilisons certains
        sous-traitants tiers pour nous aider à exécuter nos applications et à vous fournir les Services.
      </p>
      <p>
        Aucun employé de {companyName} ne consulte votre contenu sauf à des fins limitées avec votre permission expresse,
        par exemple, si une erreur se produit qui empêche un processus automatisé de fonctionner et nécessite une intervention
        manuelle pour être corrigée. Ce sont des cas rares, et lorsqu'ils se produisent, nous recherchons des solutions de
        cause profonde autant que possible pour éviter qu'ils ne se reproduisent. Nous pouvons également accéder à vos données
        si cela est nécessaire pour répondre à une procédure légale (voir « Lorsque requis par la loi applicable » ci-dessous).
      </p>
      <p>
        <strong>Pour vous aider à résoudre un problème ou à corriger un bug logiciel, avec votre permission.</strong> Si à
        tout moment nous devons accéder à votre contenu pour vous aider avec un cas de support, nous vous demanderons votre
        consentement avant de procéder.
      </p>
      <p>
        <strong>Données agrégées et anonymisées.</strong> Nous pouvons agréger et/ou anonymiser les informations collectées
        via les services. Nous pouvons utiliser des données anonymisées ou agrégées à toute fin, y compris le marketing ou
        l'analyse.
      </p>
      <p>
        <strong>Lorsque requis par la loi applicable.</strong>
        {companyName} opère avec une infrastructure de données aux États-Unis et dans l'UE.
      </p>
      <ul>
        <li>
          <p>
            Demandes de données utilisateur. Notre politique est de ne pas répondre aux demandes gouvernementales de
            données utilisateur à moins d'y être contraints par une procédure légale ou dans des circonstances limitées
            en cas de demande d'urgence. Cependant, si les autorités chargées de l'application de la loi disposent du
            mandat nécessaire, de l'assignation pénale ou de l'ordonnance du tribunal nous obligeant à divulguer des
            données, nous devons nous conformer. La politique de {companyName} est de notifier les clients concernés avant
            de divulguer des données, sauf si nous en sommes légalement interdits, et sauf dans certains cas d'urgence.
          </p>
        </li>
        <li>
          <p>
            Demandes de conservation. De même, la politique de {companyName} est de se conformer aux demandes de conservation
            de données uniquement si elles sont imposées par une procédure légale appropriée. Nous ne divulguons pas les données
            conservées sauf si la loi l'exige ou si une ordonnance du tribunal nous y contraint.
          </p>
        </li>
        <li>
          <p>
            Si nous sommes audités par une autorité fiscale, nous pouvons être tenus de divulguer des informations liées
            à la facturation. Si cela se produit, nous ne divulguerons que le minimum nécessaire, comme les adresses de
            facturation et les informations d'exonération fiscale.
          </p>
        </li>
      </ul>
      <p>
        Enfin, si {companyName} est acquis par ou fusionne avec une autre entreprise — nous ne prévoyons pas cela, mais si
        cela se produit — nous vous en informerons bien avant que vos informations personnelles ne soient transférées ou ne
        deviennent soumises à une politique de confidentialité différente.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="your-rights-with-respect-to-your-information">Vos droits concernant vos informations</h2>
      <p>
        Chez {companyName}, nous nous efforçons d'appliquer les mêmes droits sur les données à tous les clients, quel
        que soit leur emplacement. Certains de ces droits incluent :
      </p>
      <ul>
        <li>
          <strong>Droit de savoir.</strong> Vous avez le droit de savoir quelles informations personnelles sont collectées,
          utilisées, partagées ou vendues. Nous décrivons à la fois les catégories et les éléments spécifiques de données
          que nous collectons, ainsi que la façon dont ils sont utilisés, dans cette politique de confidentialité.
        </li>
        <li>
          <strong>Droit d'accès.</strong> Cela inclut votre droit d'accéder aux informations personnelles que nous recueillons
          à votre sujet, et votre droit d'obtenir des informations sur le partage, le stockage, la sécurité et le traitement
          de ces informations.
        </li>
        <li>
          <strong>Droit de rectification.</strong> Vous avez le droit de demander la correction de vos informations personnelles.
        </li>
        <li>
          <strong>Droit à l'effacement / « Droit à l'oubli ».</strong> C'est votre droit de demander, sous réserve de
          certaines limitations en vertu de la loi applicable, que vos informations personnelles soient effacées de
          notre possession et, par extension, de tous nos prestataires de services. L'exécution de certaines demandes de
          suppression de données peut vous empêcher d'utiliser les services {companyName} car nos applications peuvent alors
          ne plus fonctionner. Dans de tels cas, une demande de suppression de données peut entraîner la fermeture de votre
          compte.
        </li>
        <li>
          <strong>Droit de réclamation.</strong> Vous avez le droit de déposer une réclamation concernant notre traitement
          de vos informations personnelles auprès de l'autorité de surveillance appropriée.
        </li>
        <li>
          <strong>Droit de limiter le traitement.</strong> C'est votre droit de demander la limitation de la façon dont et
          pourquoi vos informations personnelles sont utilisées ou traitées, y compris le refus de la vente de vos informations
          personnelles. (Encore une fois : nous n'avons jamais vendu et ne vendrons jamais vos données personnelles.)
        </li>
        <li>
          <strong>Droit d'opposition.</strong> Vous avez le droit, dans certaines situations, de vous opposer à la façon dont
          ou pourquoi vos informations personnelles sont traitées.
        </li>
        <li>
          <strong>Droit à la portabilité.</strong> Vous avez le droit de recevoir les informations personnelles que nous
          avons à votre sujet et le droit de les transmettre à une autre partie. Si vous souhaitez exporter des données,
          vous pouvez <a href={contactLink}>nous contacter</a>.
        </li>
        <li>
          <strong>Droit de ne pas être soumis à une prise de décision automatisée.</strong> Vous avez le droit de vous opposer
          et d'empêcher toute décision qui pourrait avoir un effet juridique ou similairement significatif sur vous d'être
          prise uniquement sur la base de processus automatisés. Ce droit est limité si la décision est nécessaire à l'exécution
          de tout contrat entre vous et nous, est autorisée par la loi applicable ou est basée sur votre consentement explicite.
        </li>
        <li>
          <strong>Droit à la non-discrimination.</strong> Nous ne vous facturons pas et ne vous facturerons pas un montant
          différent pour utiliser nos produits, ne vous offrons pas de réductions différentes, ni ne vous fournissons un niveau
          de service client inférieur parce que vous avez exercé vos droits en matière de confidentialité des données. Cependant,
          l'exercice de certains droits peut, en vertu de l'exercice de ces droits, vous empêcher d'utiliser nos Services.
        </li>
      </ul>
      <p>
        Veuillez noter que certaines informations peuvent être exemptées de telles demandes en vertu de la loi
        applicable. Par exemple, nous devons conserver certaines informations afin de vous fournir nos services.
      </p>
      <p>
        Dans certains cas, nous devons également prendre des mesures raisonnables pour vérifier votre identité avant de
        répondre à une demande, ce qui peut inclure, au minimum, selon la sensibilité des informations que vous demandez
        et le type de demande que vous faites, la vérification de votre nom et de votre adresse e-mail. Si nous ne
        sommes pas en mesure de vous vérifier, nous pourrions ne pas être en mesure de répondre à vos demandes. Si vous
        avez des questions sur l'exercice de ces droits ou avez besoin d'assistance, veuillez <a href={contactLink}
          >nous contacter</a
        >. Si un agent autorisé correspond en votre nom, nous aurons besoin d'un consentement écrit avec une signature
        du titulaire du compte avant de procéder.
      </p>
      <p>
        Selon la loi applicable, vous pouvez avoir le droit de faire appel de notre décision de refuser votre demande,
        le cas échéant. Nous fournirons des informations sur la façon d'exercer ce droit dans notre réponse refusant la
        demande. Vous avez également le droit de déposer une plainte auprès d'une autorité de surveillance. Si vous êtes
        dans l'UE ou au Royaume-Uni, vous pouvez contacter votre autorité de protection des données pour déposer une
        plainte ou en savoir plus sur les lois locales sur la protection de la vie privée.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="california-privacy-rights">Droits de confidentialité en Californie</h2>
      <p>
        Si vous êtes résident de Californie, vous disposez de droits supplémentaires en vertu du California Consumer
        Privacy Act (CCPA). Nous ne vendons ni ne partageons vos informations personnelles telles que définies par le
        CCPA. Pour les catégories d'informations personnelles que nous collectons et nos finalités, consultez la section
        « Ce que nous collectons et pourquoi » ci-dessus.
      </p>
      <p>
        En vertu de la loi californienne « Shine the Light », nous ne divulguons pas d'informations personnelles à des
        tiers à des fins de marketing direct.
      </p>
      <p>
        Si vous avez des questions sur l'exercice de vos droits de confidentialité en Californie, veuillez
        <a href={contactLink}>nous contacter</a>.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="how-we-secure-your-data">Comment nous sécurisons vos données</h2>
      <p>
        Toutes les données sont chiffrées via <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security"
          >SSL/TLS</a>
        lors de leur transmission de nos serveurs vers votre navigateur. Les sauvegardes de base de données sont également
        chiffrées. Nous faisons tout notre possible pour sécuriser vos données au repos.
      </p>
      <p>
        La plupart des données ne sont pas chiffrées lorsqu'elles résident dans notre base de données (car elles doivent
        être prêtes à vous être envoyées lorsque vous en avez besoin).
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="data-retention">Conservation des données</h2>
      <p>
        Nous conservons vos informations pendant le temps nécessaire aux fins pour lesquelles elles sont traitées. La
        durée pendant laquelle nous conservons les informations dépend des fins pour lesquelles nous les avons
        collectées et utilisées et de vos choix, après quoi nous pouvons les supprimer et/ou les agréger. Nous pouvons
        également conserver et utiliser ces informations si nécessaire pour nous conformer à nos obligations légales,
        résoudre des litiges et faire respecter nos accords. Dans cette politique, nous avons fourni des périodes de
        conservation spécifiques pour certains types d'informations.
      </p>
      {#if googleAnalytics}
        <p>Les données Google Analytics sont conservées pendant 2 mois.</p>
      {/if}
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="cookies">Cookies</h2>
      <p>
        Nous utilisons des cookies essentiels qui sont nécessaires au bon fonctionnement du site web. Ceux-ci incluent
        des cookies à des fins de sécurité{#if hasTracking}
          et pour stocker vos préférences de consentement aux cookies{/if}.
      </p>
      {#if googleAnalytics}
        <h3>Cookies analytiques</h3>
        <p>
          Avec votre consentement, nous utilisons Google Analytics pour comprendre comment les visiteurs interagissent
          avec notre site web. Google Analytics utilise des cookies pour collecter des informations telles que :
        </p>
        <ul>
          <li>Les pages que vous visitez et le temps que vous y passez</li>
          <li>Comment vous êtes arrivé sur notre site (source de référence)</li>
          <li>Votre localisation géographique générale (niveau pays/ville)</li>
          <li>Votre type d'appareil, navigateur et système d'exploitation</li>
        </ul>
        <p>
          Ces données sont agrégées et anonymisées. Nous les utilisons pour améliorer notre site web et comprendre quel
          contenu est le plus utile aux visiteurs.
        </p>
        <p>
          Pour plus d'informations sur la façon dont Google traite ces données, consultez la
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener"
            >Politique de confidentialité de Google</a
          >.
        </p>
      {/if}
      {#if hasAds}
        <h3>Cookies publicitaires et de suivi</h3>
        {#if googleAds}
          <p>
            Avec votre consentement, nous utilisons Google Ads pour mesurer l'efficacité de nos campagnes publicitaires
            et diffuser des publicités pertinentes. Google Ads peut utiliser des cookies pour suivre les conversions
            (actions que vous effectuez après avoir cliqué sur une annonce) et pour vous montrer des publicités
            personnalisées en fonction de votre activité de navigation.
          </p>
          <p>
            Pour plus d'informations, consultez la
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener"
              >Politique de confidentialité de Google</a>
            et les
            <a href="https://adssettings.google.com" target="_blank" rel="noopener">Paramètres des annonces Google</a>.
          </p>
        {/if}
        {#if metaPixel}
          <p>
            Avec votre consentement, nous utilisons le Pixel Meta (Facebook/Instagram) et l'API Conversions pour mesurer
            l'efficacité de notre publicité et diffuser des publicités pertinentes. Le suivi Meta peut collecter des
            informations sur vos interactions avec notre site web, y compris les pages visitées et les actions
            effectuées. Ces données peuvent être envoyées à Meta à la fois via des cookies du navigateur (Pixel) et via
            une communication serveur à serveur (API Conversions).
          </p>
          <p>
            Pour plus d'informations, consultez la
            <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener"
              >Politique de confidentialité de Meta</a
            >.
          </p>
        {/if}
      {/if}
      <h3>Gestion de vos préférences de cookies</h3>
      {#if hasTracking}
        <p>
          Lors de votre première visite sur notre site, vous verrez une bannière de consentement aux cookies où vous
          pourrez choisir quels types de cookies accepter. Vous pouvez modifier vos préférences à tout moment en
          cliquant sur l'icône de cookie dans le coin de la page.
        </p>
      {/if}
      <p>
        Vous pouvez également gérer ou désactiver les cookies via les paramètres de votre navigateur. La plupart des
        navigateurs vous permettent de bloquer ou de supprimer les cookies, bien que cela puisse affecter la
        fonctionnalité du site web.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="location-of-site-and-data">Emplacement du site et des données</h2>
      <p>
        Nos sites web et services, y compris {websiteDomain} et ses sous-domaines, sont exploités avec une infrastructure
        aux États-Unis et dans l'Union européenne. Si vous êtes situé ailleurs,
        <strong
          >veuillez noter que toute information que vous nous fournissez sera transférée et stockée dans ces
          emplacements</strong
        >. En utilisant nos sites web ou Services et/ou en nous fournissant vos informations personnelles, vous
        consentez à ce transfert.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="when-transferring-personal-data-from-the-eu">Lors du transfert de données personnelles depuis l'UE</h2>
      <p>
        Le Comité européen de la protection des données (CEPD) a émis des orientations selon lesquelles les données
        personnelles transférées hors de l'UE doivent être traitées avec le même niveau de protection que celui accordé
        par la législation européenne sur la protection de la vie privée. La législation britannique prévoit des
        garanties similaires pour les données des utilisateurs britanniques transférées hors du Royaume-Uni. En
        conséquence, {companyName} a adopté des mesures appropriées pour aider à assurer cette protection.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="changes-and-questions">Modifications et questions</h2>
      <p>
        Nous pouvons mettre à jour cette politique si nécessaire pour nous conformer aux réglementations pertinentes et
        refléter toute nouvelle pratique. Chaque fois que nous apportons une modification significative à nos
        politiques, nous actualiserons la date en haut de cette page et prendrons toute autre mesure appropriée pour
        notifier les utilisateurs.
      </p>
      <p>
        Avez-vous des questions, des commentaires ou des préoccupations concernant cette politique de confidentialité,
        vos données ou vos droits concernant vos informations ? N'hésitez pas à nous <a href={contactLink}>contacter</a
        >, et nous serons heureux d'essayer d'y répondre !
      </p>
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
