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
      <h1>Terms of Service</h1>
      <hr />
      <p class="last-updated"><em>Last updated: {updated}</em></p>
      <p>
        From all of us at {companyName}, we sincerely appreciate you using our services! We created them to support you
        in building your business online. While we'd love to know each of our clients personally, we rely on our Terms
        of Service to ensure everything runs smoothly for everyone.
      </p>
      <p>
        When we say "Company", "we", "our", or "us" in this document, we are referring to <a href={links.home}
          >{companyName}</a
        >.
      </p>
      <p>
        When we say 'Services', we mean skywalklab.com, its subdomains, and any product created and maintained by
        {companyName}. That includes any {companyName} service, whether delivered within a web browser, desktop application,
        mobile application, or another format.
      </p>
      <p>When we say "You" or "your", we are referring to the people or organizations that engage our Services.</p>
      <p>
        We may update these Terms of Service in the future. Whenever we make a significant change to our policies, we
        will refresh the date at the top of this page and take any other appropriate steps to notify clients.
      </p>
      <p>
        When you use our Services, now or in the future, you are agreeing to the latest Terms. There may be times where
        we do not exercise or enforce a right or provision of the Terms; however, that does not mean we are waiving that
        right or provision. <strong>These Terms do contain a limitation of our liability.</strong>
      </p>
      <p>
        If you violate any of the Terms, we may terminate our services. That's a broad statement and it means you need
        to place a lot of trust in us. We do our best to deserve that trust by being open about <a href={links.about}
          >who we are</a
        >,
        <a href={links.services}>how we work</a>, and keeping an open door to your
        <a href={links.contact}>feedback</a>.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Service Terms</h2>
      <ol>
        <li>
          You are responsible for maintaining the security of any accounts and passwords associated with projects we
          build for you, and for ensuring that any of your users do the same. The Company cannot and will not be liable
          for any loss or damage from your failure to comply with this security obligation.
        </li>
        <li>
          You are responsible for all content added to and activity that occurs on websites or applications we build for
          you, including content added by and activity of any users.
        </li>
        <li>You must be a human. Accounts registered by "bots" or other automated methods are not permitted.</li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Payment, Refunds, and Plan Changes</h2>
      <ol>
        <li>
          For paid Services, we explain the pricing and payment terms when you engage our services. Payment terms are
          agreed upon before work begins.
        </li>
        <li>
          If you are on a monthly plan, you need to pay in advance to keep using the Service. If you do not pay, we will
          pause services until payment is received.
        </li>
        <li>
          All fees are exclusive of all taxes, levies, or duties imposed by taxing authorities. Where required, we will
          collect those taxes on behalf of the taxing authority and remit those taxes to taxing authorities. Otherwise,
          you are responsible for payment of all taxes, levies, or duties.
        </li>
        <li>We process refunds on a case-by-case basis according to our agreement with you.</li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Cancellation and Termination</h2>
      <ol>
        <li>
          You are solely responsible for properly canceling your services. If you need help canceling, you can always
          contact our <a href={links.contact}>Support team</a>.
        </li>
        <li>
          Upon cancellation of monthly services, your website or application will remain accessible until the end of the
          paid period. After that, services will be suspended until payment resumes or alternative arrangements are
          made.
        </li>
        <li>
          If you cancel the Service before the end of your current paid up month, your cancellation will take effect at
          the end of the billing period, and you will not be charged again.
        </li>
        <li>
          We have the right to suspend or terminate services and refuse any and all current or future use of our
          Services for any reason at any time. Suspension means your website or application will not be accessible. We
          reserve the right to refuse the use of the Services to anyone for any reason at any time. There are some
          things we staunchly stand against and this clause is how we exercise that stance.
        </li>
        <li>
          Verbal, physical, written or other abuse (including threats of abuse or retribution) of a Company employee or
          officer will result in immediate service termination.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Modifications to the Service and Prices</h2>
      <ol>
        <li>
          We make a promise to our clients to support our Services. That means when it comes to security, privacy, and
          customer support, we will continue to maintain any services we provide. Sometimes it becomes technically
          impossible to continue a feature or we redesign a part of our Services because we think it could be better. We
          reserve the right at any time to modify or discontinue, temporarily or permanently, any part of our Services
          with reasonable notice.
        </li>
        <li>
          Sometimes we change the pricing structure for our services. When we do that, we tend to exempt existing
          clients from those changes. However, we may choose to change the prices for existing clients. If we do so, we
          will give at least 30 days notice and will notify you via the email address on record.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Uptime, Security, and Privacy</h2>
      <ol>
        <li>
          Your use of the Services is at your sole risk. We provide these Services on an "as is" and "as available"
          basis. We do not offer service-level agreements for most of our Services — but do take uptime of our
          applications seriously.
        </li>
        <li>
          We reserve the right to temporarily disable services if usage significantly exceeds normal levels. Of course,
          we'll reach out to you before taking any action except in rare cases where the level of use may negatively
          impact the performance of the Service for other clients.
        </li>
        <li>
          We take many measures to protect and secure your data through backups, redundancies, and encryption. We
          enforce encryption for data transmission from the public Internet.
        </li>
        <li>
          When you use our Services, you entrust us with your data. We take that trust to heart. You agree that
          {companyName} may process your data as described in our
          <a href={links.privacy}>Privacy Policy</a> and for no other purpose. We as humans can access your data for the following
          reasons:
        </li>
      </ol>
      <ul>
        <li>
          <strong>To help you with support requests you make.</strong> We'll ask for express consent before accessing your
          data.
        </li>
        <li>
          <strong>On the rare occasions when an error occurs that stops an automated process partway through.</strong> We
          get automated alerts when such errors occur. When we can fix the issue and restart automated processing without
          looking at any personal data, we do. In rare cases, we have to look at a minimum amount of personal data to fix
          the issue. In these rare cases, we aim to fix the root cause to prevent the errors from recurring.
        </li>
        <li>
          <strong>To safeguard {companyName}.</strong> We'll look at logs and metadata as part of our work to ensure the security
          of your data and the Services as a whole. If necessary, we may also access data as part of an abuse report investigation.
        </li>
        <li>
          <strong>To the extent required by applicable law.</strong> As a company with data infrastructure located in
          the US and EU, we only preserve or share customer data if compelled by a government authority with a legally
          binding order or proper request. It is {companyName}'s policy to notify affected clients before we disclose
          data unless we are legally prohibited from doing so.
        </li>
      </ul>
      <ol start="5">
        <li>
          We use third party vendors and hosting partners to provide the necessary hardware, software, networking,
          storage, and related technology required to run skywalklab.com, its subdomains, and the Services.
        </li>
        <li>
          Under the California Consumer Privacy Act ("CCPA"), {companyName} is a "service provider", not a "business" or "third
          party", with respect to your use of the Services. That means we process any data you share with us only for the
          purpose you signed up for and as described in these Terms and the
          <a href={links.privacy}>Privacy Policy</a>. We do not retain, use, disclose, or sell any of that information
          for any other commercial purposes unless we have your explicit permission. And on the flip-side, you agree to
          comply with your requirements under the CCPA and not use {companyName}'s Services in a way that violates the
          regulations.
        </li>
        <li>
          These Terms adhere to the EU General Data Protection Regulation ("GDPR") and the United Kingdom General Data
          Protection Regulation ("UK GDPR") and apply to your use of {companyName} services.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Copyright and Content Ownership</h2>
      <ol>
        <li>All content posted on the Services must comply with applicable copyright law.</li>
        <li>
          You give us a limited license to use the content posted by you and your users in order to provide the Services
          to you, but we claim no ownership rights over those materials. All materials you submit to the Services remain
          yours.
        </li>
        <li>
          We do not pre-screen content, but we reserve the right (but not the obligation) in our sole discretion to
          refuse or remove any content that is available via the Service.
        </li>
        <li>
          The Company or its licensors own all right, title, and interest in and to the Services, including all
          intellectual property rights therein, and you obtain no ownership rights in the Services as a result of your
          use. You may not duplicate, copy, or reuse any portion of the HTML, CSS, JavaScript, or visual design elements
          without express written permission from the Company. You must request permission to use the Company's logos or
          any Service logos for promotional purposes. Please email us requests to use logos. We reserve the right to
          rescind any permissions if you violate these Terms.
        </li>
        <li>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Services, use of the
          Services, or access to the Services without the express written permission of the Company.
        </li>
      </ol>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Features and Bugs</h2>
      <p>
        We design our Services with care, based on our own experience and the experiences of clients who share their
        time and feedback. However, there is no such thing as a service that pleases everybody. We make no guarantees
        that our Services will meet your specific requirements or expectations.
      </p>
      <p>
        We also test all of our features extensively before shipping them. As with any software, our Services inevitably
        have some bugs. We track the bugs reported to us and work through priority ones, especially any related to
        security or privacy. Not all reported bugs will get fixed and we don't guarantee completely error-free Services.
      </p>
    </div>
  </section>
  <section>
    <div class="inner-container">
      <h2>Liability</h2>
      <p>We mention liability throughout these Terms but to put it all in one section:</p>
      <p>
        <em
          ><strong
            >You expressly understand and agree that the Company shall not be liable, in law or in equity, to you or to
            any third party for any direct, indirect, incidental, lost profits, special, consequential, punitive or
            exemplary damages, including, but not limited to, damages for loss of profits, goodwill, use, data or other
            intangible losses (even if the Company has been advised of the possibility of such damages), resulting from:
            (i) the use or the inability to use the Services; (ii) the cost of procurement of substitute goods and
            services resulting from any goods, data, information or services purchased or obtained or messages received
            or transactions entered into through or from the Services; (iii) unauthorized access to or alteration of
            your transmissions or data; (iv) statements or conduct of any third party on the service; (v) or any other
            matter relating to these Terms or the Services, whether as a breach of contract, tort (including negligence
            whether active or passive), or any other theory of liability.</strong
          ></em>
      </p>
      <p>
        By using {companyName}'s services, including skywalklab.com and its subdomains, you're placing trust in us—and
        we don't take that lightly. While we can't guarantee everything will always go perfectly, we're committed to
        making
        {companyName} a solid choice through thoughtful stewardship, robust security, reliable infrastructure, and a deep
        passion for what we do. We appreciate you choosing {companyName} to support your business.
      </p>
      <p>
        If you have a question about any of these Terms, please contact our <a href={links.contact}>Support team</a>.
      </p>
    </div>
  </section>

  <section>
    <div class="inner-container">
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
