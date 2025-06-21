import React from "react";
import { FooterForm } from "./_container/FooterForm";
import { FooterMenu } from "./_container/FooterMenu";

function FooterPage() {
  return (
    <div className="">
      <FooterForm />
      <section className="">
        <FooterMenu />
      </section>
    </div>
  );
}

export default FooterPage;
