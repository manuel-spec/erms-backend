const invitationTemplate = (invitationLink) => {
    return `
       <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>invitation</title>
        <style>
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 0 20px;
            }

            .header {
                padding: 20px;
                margin-bottom: 30px;
                text-align: center;
                height: 100px;
                display: flex;
                align-items: end;
                justify-content: center;
                /* border: 1px solid magenta; */
            }

            .img {
                width: 155px;
                height: 44px;
            }

            hr {
                border: none;
                height: 1px;
                background-color: #cbcbcb;
                width: 75%;
            }

            .content {
                padding: 20px;
                padding: 20px 40px;
                height: 380px;
            }

            .welcome-message {
                font-family: poppins;
                font-weight: 300;
                font-size: 32px;
                color: #2d7c15;
                width: 400px;
            }

            .text-content {
                font-family: poppins;
                font-weight: 500;
                font-size: 14px;
                color: #4a4a4a;
            }

            .btn {
                border: none;
                font-size: 16px;
                font-weight: 600;
                padding: 20px 40px;
                margin: 20px 0;
                color: white;
                background-color: #18598b;
                cursor: pointer;
            }

            .btn:hover {
                background-color: #24638d;
            }
            .url-link {
                font-family: poppins;
                font-weight: 400;
                font-size: 12px;
                color: #18598b;
                text-decoration: none;
            }

            .footer {
                padding: 5px 50px 0 50px;
                height: 200px;
            }

            .footer-content {
                background-color: #f5f5f5;
                height: 100%;
                width: 100%;
                padding: 30px;
                text-align: left;

                box-sizing: border-box;
            }

            .footer-logo {
                width: 77px;
                height: 20px;
                filter: grayscale(100%);
                opacity: 0.7;
                margin-bottom: 20px;
            }

            .footer-text {
                color: #9c9c9c;
                font-family: poppins;
                font-size: 12px;
            }

            .links-wrapper {
                display: flex;
                justify-content: start;
                align-items: center;
                margin-top: 20px;
                font-family: poppins;
                font-size: 12px;
                font-weight: 500;
                color: #868686;
            }

            .footer-link {
                margin-right: 20px;
                text-decoration: none;
                color: #868686;
            }
        </style>
    </head>
    <body>
        <!-- Email Tamplate -->
        <main class="container">
            <header class="header">
                <!-- <h1>Repairs Client</h1> -->
                <img
                    src="https://Repairs.sematha.com/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=256&q=75"
                    alt="Logo"
                    class="img"
                />
            </header>
            <hr />
            <section class="content">
                <h1 class="welcome-message">
                    You have been invited to join __________
                </h1>
                <p class="text-content">
                    We invite you to begin using the AMR Data Sharing Platform
                    to manage and track AMR-related data more efficiently.
                </p>
                <br />
                <br />
                <a class="btn" href='${invitationLink}'>Accept Invitation</a>
                <br />
                <br />
                <p class="url-link">
                    Or copy this link to your browser
                    <span style="font-weight: 700"
                        ><a style="cursor: pointer">${invitationLink}</a></span
                    >
                </p>
            </section>
            <footer class="footer">
                <div class="footer-content">
                    <img
                        class="footer-logo"
                        src="https://Repairs.sematha.com/_next/image?url=%2Fimages%2Flogo%2Flogo.png&w=256&q=75"
                        alt="logo"
                    />
                    <p class="footer-text">
                        Best regards,<br />AMR Team
                    </p>
                    <div class="links-wrapper">
                        <p class="footer-link">Terms and Conditions</p>
                        <p class="footer-link">|</p>
                        <p class="footer-link">Contact Us</p>
                    </div>
                </div>
            </footer>
        </main>
    </body>
</html>

    `;
};

module.exports = { invitationTemplate };
