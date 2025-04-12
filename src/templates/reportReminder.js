const mjml2html = require("mjml");

const reportReminderTemplate = (reportLink, firstName) =>
    mjml2html(`
 <mjml>
  <mj-head>
    <mj-title>Password Reset</mj-title>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto:300,500"></mj-font>
    <mj-attributes>
      <mj-all font-family="Roboto, Helvetica, sans-serif"></mj-all>
      <mj-text font-weight="300" font-size="16px" color="#616161" line-height="24px"></mj-text>
      <mj-section padding="0px"></mj-section>
    </mj-attributes>
  </mj-head>
  <mj-body>
        <mj-section>
      <mj-column>
        <mj-image width="100%" src="https://Repairs.sematha.com/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=256&q=75"></mj-image>

        <mj-divider border-color="#009fe3"></mj-divider>

        <mj-text font-size="20px" color="#009fe3" font-family="helvetica">Dear ${firstName},</mj-text>
          </mj-column>
    </mj-section>
 
    <mj-section >
      <mj-column width="100%">
        <mj-text>
                    <p> This is a friendly reminder that your report is due shortly.
                    Please ensure that you submit it by the deadline to avoid
                    any delays. </p>
          
          <p> you can also jump to submitting by clicking the button below</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
     <mj-column>
       <mj-button align="left" background-color="#009fe3" color="white" padding="20px 20px 30px 20px" border-radius="20px" href="${reportLink}">
         
Submit Report
               
      </mj-button>
          
      </mj-column>
    </mj-section>
    
  </mj-body>
</mjml>
`);

module.exports = { reportReminderTemplate };
