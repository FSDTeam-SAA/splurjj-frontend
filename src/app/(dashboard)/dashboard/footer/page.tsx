import React from "react";
import { FooterForm } from "./_container/FooterForm";
import PrivacyPolicy from "./_container/PrivacyPolicy";
import CookiesPolicy from "./_container/CookiesPolicy";
import TermsAndCondition from "./_container/TermsAndCondition";
import InvestmentDisclaimer from "./_container/InvestmentDisclaimer";
// import { FooterMenu } from "./_container/FooterMenu";

function FooterPage() {
  return (
    <div className="">
      <FooterForm />
      {/* <section className="">
        <FooterMenu />
      </section> */}

      <section className="my-10">
        <PrivacyPolicy />
      </section>

      <section>
        <CookiesPolicy />
      </section>

      <section className="my-10">
        <TermsAndCondition />
      </section>

      <section className="my-10">
        <InvestmentDisclaimer />
      </section>
    </div>
  );
}

export default FooterPage;
