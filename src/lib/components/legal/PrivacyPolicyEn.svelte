<script lang="ts">
  // Original Privacy Template: https://github.com/basecamp/policies/blob/master/privacy/index.md?plain=1

  interface Props {
    /** Company the policy belongs to. */
    companyName: string;
    /** Domain the policy covers. */
    websiteDomain: string;
    /** Path to the contact page. */
    contactLink: string;
    /** Date the policy was last updated. */
    updated: string;
    /** Include the Google Analytics section. */
    googleAnalytics?: boolean;
    /** Include the Google Ads section. */
    googleAds?: boolean;
    /** Include the Meta Pixel section. */
    metaPixel?: boolean;
    /** Include the Klaviyo section. */
    klaviyo?: boolean;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    companyName,
    websiteDomain,
    contactLink,
    updated,
    googleAnalytics = false,
    googleAds = false,
    metaPixel = false,
    klaviyo = false,
    style
  }: Props = $props();

  const hasAnalytics = $derived(googleAnalytics);
  const hasAds = $derived(googleAds || metaPixel);
  const hasTracking = $derived(hasAnalytics || hasAds);
</script>

<div class="privacy standard" id="privacy-page-id" {style}>
  <section>
    <div class="inner-container">
      <h1 id="privacy-policy">Privacy policy</h1>
      <hr />
      <p class="last-updated"><em>Last updated: {updated}</em></p>
      <p>
        The privacy of your data—and it is your data, not ours!—is a big deal to us. In this policy, we lay out: what
        data we collect and why; how your data is handled; and your rights with respect to your data. We promise we
        never sell your data: never have, never will.
      </p>
      <p>This policy is split into sections. For your convenience, links to each of those sections is as follows:</p>
      <ul>
        <li>
          <a href="#privacy-policy">Privacy policy</a>
        </li>
        <li>
          <a href="#what-we-collect-and-why">What we collect and why</a>
        </li>
        <li>
          <a href="#when-we-access-or-disclose-your-information">When we access or disclose your information</a>
        </li>
        <li>
          <a href="#your-rights-with-respect-to-your-information">Your rights with respect to your information</a>
        </li>
        <li>
          <a href="#california-privacy-rights">California privacy rights</a>
        </li>
        <li>
          <a href="#how-we-secure-your-data">How we secure your data</a>
        </li>
        <li>
          <a href="#data-retention">Data retention</a>
        </li>
        <li>
          <a href="#cookies">Cookies</a>
        </li>
        <li>
          <a href="#location-of-site-and-data">Location of site and data</a>
        </li>
        <li>
          <a href="#when-transferring-personal-data-from-the-eu">When transferring personal data from the EU</a>
        </li>
        <li>
          <a href="#changes-and-questions">Changes and questions</a>
        </li>
      </ul>
      <p>
        This policy applies to all products and services offered by {companyName}, including those on {websiteDomain} and
        its subdomains.
      </p>
      <p>
        This policy applies to our handling of information about site visitors, prospective clients, and clients (in
        relation to their procurement of the services and management of their relationship with {companyName}). We refer
        collectively to these categories of individuals as "you" throughout this policy.
      </p>
      <p>
        However, this policy does not cover information about a client's end users that {companyName} receives from a client,
        or otherwise processes on a client's behalf, in connection with the services provided by {companyName}
        to the client pursuant to an applicable services agreement. {companyName} processes such information under the instructions
        of the relevant client, which is the "data controller" or "business" (or occupies a similar role as defined in applicable
        privacy laws), as described in the applicable services agreement between such client and
        {companyName}.
      </p>
      <p>
        If you are a client's end user and you have questions about how your information is collected and processed
        through the services, please contact the organization who has provided your information to us for more
        information.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="what-we-collect-and-why">What we collect and why</h2>
      <p>Our guiding principle is to collect only what we need. Here's what that means in practice:</p>
      <h3>Identity and access</h3>
      <p>
        When you contact {companyName} or engage our services, we ask for identifying information such as your name, email
        address, and maybe a company name. That's so we can communicate with you about your project and send you important
        updates. We may also send you optional information about our services from time to time. With your consent, we will
        send you our newsletter and other updates.
      </p>
      <p>
        We'll never sell your personal information to third parties, and we won't use your name or company in marketing
        statements without your permission either.
      </p>
      <h3>Billing information</h3>
      <p>
        If you engage paid {companyName} services, you will be asked to provide your payment information and billing address.
        Credit card information is submitted directly to our payment processor and doesn't hit {companyName}
        servers. We store a record of the payment transaction, including the last 4 digits of the credit card number, for
        purposes of account history, invoicing, and billing support. We store your billing address so we can charge you for
        service, calculate any sales tax due, send you invoices, and detect fraudulent credit card transactions.
      </p>
      <h3>Website interactions</h3>
      <p>
        We collect basic information about your browsing activity for understanding how visitors use our website. This
        includes your browser and operating system versions, your IP address, and which web pages you visited. This
        information helps us improve our website and services.
      </p>
      <h3>General Geolocation data</h3>
      <p>We log the full IP address used to access our website for security and fraud prevention purposes.</p>
      <h3>Communications</h3>
      <p>
        When you contact us via our contact form or email, we collect the information you provide (name, email, message
        content) so we can respond to your inquiry and maintain records of our communications.
      </p>
      {#if klaviyo}
        <h3>Email marketing</h3>
        <p>
          If you subscribe to our newsletter or marketing emails, we use Klaviyo to manage our email communications.
          Klaviyo collects your email address and tracks how you interact with our emails (such as opens and clicks) to
          help us improve our communications. You can unsubscribe at any time using the link in any email. For more
          information, see <a href="https://www.klaviyo.com/legal/privacy/privacy-notice" target="_blank" rel="noopener"
            >Klaviyo's Privacy Notice</a
          >.
        </p>
      {/if}
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="when-we-access-or-disclose-your-information">When we access or disclose your information</h2>
      <p>
        <strong>To provide products or services you've requested</strong>. We use some third-party subprocessors to help
        run our applications and provide the Services to you.
      </p>
      <p>
        No {companyName} human looks at your content except for limited purposes with your express permission, for example,
        if an error occurs that stops an automated process from working and requires manual intervention to fix. These are
        rare cases, and when they happen, we look for root cause solutions as much as possible to avoid them recurring. We
        may also access your data if required in order to respond to legal process (see "When required under applicable law"
        below).
      </p>
      <p>
        <strong>To help you troubleshoot or squash a software bug, with your permission.</strong> If at any point we need
        to access your content to help you with a support case, we will ask for your consent before proceeding.
      </p>
      <p>
        <strong>Aggregated and de-identified data.</strong> We may aggregate and/or de-identify information collected through
        the services. We may use de-identified or aggregated data for any purpose, including marketing or analytics.
      </p>
      <p>
        <strong>When required under applicable law.</strong>
        {companyName} operates with data infrastructure in the U.S. and EU.
      </p>
      <ul>
        <li>
          <p>
            Requests for user data. Our policy is to not respond to government requests for user data unless we are
            compelled by legal process or in limited circumstances in the event of an emergency request. However, if law
            enforcement authorities have the necessary warrant, criminal subpoena, or court order requiring us to
            disclose data, we must comply. It is {companyName}'s policy to notify affected clients before we disclose
            data unless we are legally prohibited from doing so, and except in some emergency cases.
          </p>
        </li>
        <li>
          <p>
            Preservation requests. Similarly, {companyName}'s policy is to comply with requests to preserve data only if
            compelled by proper legal process. We do not disclose preserved data unless required by law or compelled by
            a court order.
          </p>
        </li>
        <li>
          <p>
            If we are audited by a tax authority, we may be required to disclose billing-related information. If that
            happens, we will disclose only the minimum needed, such as billing addresses and tax exemption information.
          </p>
        </li>
      </ul>
      <p>
        Finally, if {companyName} is acquired by or merges with another company — we don't plan on that, but if it happens
        — we'll notify you well before any of your personal information is transferred or becomes subject to a different privacy
        policy.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="your-rights-with-respect-to-your-information">Your rights with respect to your information</h2>
      <p>
        At {companyName}, we strive to apply the same data rights to all clients, regardless of their location. Some of
        these rights include:
      </p>
      <ul>
        <li>
          <strong>Right to Know.</strong> You have the right to know what personal information is collected, used, shared
          or sold. We outline both the categories and specific bits of data we collect, as well as how they are used, in this
          privacy policy.
        </li>
        <li>
          <strong>Right of Access.</strong> This includes your right to access the personal information we gather about you,
          and your right to obtain information about the sharing, storage, security and processing of that information.
        </li>
        <li>
          <strong>Right to Correction.</strong> You have the right to request correction of your personal information.
        </li>
        <li>
          <strong>Right to Erasure / "To Be Forgotten".</strong> This is your right to request, subject to certain
          limitations under applicable law, that your personal information be erased from our possession and, by
          extension, from all of our service providers. Fulfillment of some data deletion requests may prevent you from
          using {companyName} services because our applications may then no longer work. In such cases, a data deletion request
          may result in closing your account.
        </li>
        <li>
          <strong>Right to Complain.</strong> You have the right to make a complaint regarding our handling of your personal
          information with the appropriate supervisory authority.
        </li>
        <li>
          <strong>Right to Restrict Processing.</strong> This is your right to request restriction of how and why your personal
          information is used or processed, including opting out of sale of your personal information. (Again: we never have
          and never will sell your personal data.)
        </li>
        <li>
          <strong>Right to Object.</strong> You have the right, in certain situations, to object to how or why your personal
          information is processed.
        </li>
        <li>
          <strong>Right to Portability.</strong> You have the right to receive the personal information we have about
          you and the right to transmit it to another party. If you want to export data, you can
          <a href={contactLink}>contact us</a>.
        </li>
        <li>
          <strong>Right to not Be Subject to Automated Decision-Making.</strong> You have the right to object to and prevent
          any decision that could have a legal or similarly significant effect on you from being made solely based on automated
          processes. This right is limited if the decision is necessary for performance of any contract between you and us,
          is allowed by applicable law, or is based on your explicit consent.
        </li>
        <li>
          <strong>Right to Non-Discrimination.</strong> We do not and will not charge you a different amount to use our products,
          offer you different discounts, or give you a lower level of customer service because you have exercised your data
          privacy rights. However, the exercise of certain rights may, by virtue of your exercising those rights, prevent
          you from using our Services.
        </li>
      </ul>
      <p>
        Please note that certain information may be exempt from such requests under applicable law. For example, we need
        to retain certain information in order to provide our services to you.
      </p>
      <p>
        In some cases, we also need to take reasonable steps to verify your identity before responding to a request,
        which may include, at a minimum, depending on the sensitivity of the information you are requesting and the type
        of request you are making, verifying your name and email address. If we are unable to verify you, we may be
        unable to respond to your requests. If you have questions about exercising these rights or need assistance,
        please <a href={contactLink}>contact us</a>. If an authorized agent is corresponding on your behalf, we will
        need written consent with a signature from the account holder before proceeding.
      </p>
      <p>
        Depending on applicable law, you may have the right to appeal our decision to deny your request, if applicable.
        We will provide information about how to exercise that right in our response denying the request. You also have
        the right to lodge a complaint with a supervisory authority. If you are in the EU or UK, you can contact your
        data protection authority to file a complaint or learn more about local privacy laws.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="california-privacy-rights">California privacy rights</h2>
      <p>
        If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA).
        We do not sell or share your personal information as defined by the CCPA. For the categories of personal
        information we collect and our purposes, see "What we collect and why" above.
      </p>
      <p>
        Under California's "Shine the Light" law, we do not disclose personal information to third parties for their
        direct marketing purposes.
      </p>
      <p>
        If you have questions about exercising your California privacy rights, please
        <a href={contactLink}>contact us</a>.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="how-we-secure-your-data">How we secure your data</h2>
      <p>
        All data is encrypted via <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security">SSL/TLS</a>
        when transmitted from our servers to your browser. The database backups are also encrypted. We go to great lengths
        to secure your data at rest.
      </p>
      <p>
        Most data are not encrypted while they live in our database (since they need to be ready to send to you when you
        need them).
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="data-retention">Data retention</h2>
      <p>
        We keep your information for the time necessary for the purposes for which it is processed. The length of time
        for which we retain information depends on the purposes for which we collected and use it and your choices,
        after which time we may delete and/or aggregate it. We may also retain and use this information as necessary to
        comply with our legal obligations, resolve disputes, and enforce our agreements. Through this policy, we have
        provided specific retention periods for certain types of information.
      </p>
      {#if googleAnalytics}
        <p>Google Analytics data is retained for 2 months.</p>
      {/if}
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="cookies">Cookies</h2>
      <p>
        We use essential cookies that are necessary for the website to function properly. These include cookies for
        security purposes{#if hasTracking}
          and storing your cookie consent preferences{/if}.
      </p>
      {#if googleAnalytics}
        <h3>Analytics cookies</h3>
        <p>
          With your consent, we use Google Analytics to understand how visitors interact with our website. Google
          Analytics uses cookies to collect information such as:
        </p>
        <ul>
          <li>Pages you visit and how long you spend on them</li>
          <li>How you arrived at our site (referral source)</li>
          <li>Your general geographic location (country/city level)</li>
          <li>Your device type, browser, and operating system</li>
        </ul>
        <p>
          This data is aggregated and anonymized. We use it to improve our website and understand which content is most
          useful to visitors.
        </p>
        <p>
          For more information about how Google processes this data, see
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</a>.
        </p>
      {/if}
      {#if hasAds}
        <h3>Advertising and tracking cookies</h3>
        {#if googleAds}
          <p>
            With your consent, we use Google Ads to measure the effectiveness of our advertising campaigns and to
            deliver relevant advertisements. Google Ads may use cookies to track conversions (actions you take after
            clicking an ad) and to show you personalized ads based on your browsing activity.
          </p>
          <p>
            For more information, see
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's Privacy Policy</a>
            and
            <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ads Settings</a>.
          </p>
        {/if}
        {#if metaPixel}
          <p>
            With your consent, we use Meta (Facebook/Instagram) Pixel and Conversions API to measure the effectiveness
            of our advertising and to deliver relevant advertisements. Meta tracking may collect information about your
            interactions with our website, including pages visited and actions taken. This data may be sent to Meta both
            through browser cookies (Pixel) and server-to-server communication (Conversions API).
          </p>
          <p>
            For more information, see
            <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener">Meta's Privacy Policy</a>.
          </p>
        {/if}
      {/if}
      <h3>Managing your cookie preferences</h3>
      {#if hasTracking}
        <p>
          When you first visit our site, you'll see a cookie consent banner where you can choose which types of cookies
          to accept. You can change your preferences at any time by clicking the cookie icon in the corner of the page.
        </p>
      {/if}
      <p>
        You can also manage or disable cookies through your browser settings. Most browsers allow you to block or delete
        cookies, though this may affect website functionality.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="location-of-site-and-data">Location of site and data</h2>
      <p>
        Our websites and services, including {websiteDomain} and its subdomains, are operated with infrastructure in the United
        States and European Union. If you are located elsewhere,
        <strong
          >please be aware that any information you provide to us will be transferred to and stored in these locations</strong
        >. By using our websites or Services and/or providing us with your personal information, you consent to this
        transfer.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="when-transferring-personal-data-from-the-eu">When transferring personal data from the EU</h2>
      <p>
        The European Data Protection Board (EDPB) has issued guidance that personal data transferred out of the EU must
        be treated with the same level of protection that is granted under EU privacy law. UK law provides similar
        safeguards for UK user data that is transferred out of the UK. Accordingly, {companyName} has adopted appropriate
        measures to help ensure this protection.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2 id="changes-and-questions">Changes and questions</h2>
      <p>
        We may update this policy as needed to comply with relevant regulations and reflect any new practices. Whenever
        we make a significant change to our policies, we will refresh the date at the top of this page and take any
        other appropriate steps to notify users.
      </p>
      <p>
        Have any questions, comments, or concerns about this privacy policy, your data, or your rights with respect to
        your information? Please get in touch by <a href={contactLink}>contacting us</a>, and we'll be happy to try to
        answer them!
      </p>
      <p style="font-size: 12px; color: #666; margin-top: 2rem;">
        Adapted from the Basecamp open-source policies / <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          style="color: #666; text-decoration: none;">CC BY 4.0</a
        >.
      </p>
    </div>
  </section>
</div>
