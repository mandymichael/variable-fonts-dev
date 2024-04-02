import  { useEffect } from "react";
export default function MandysWebring() {
    useEffect(() => {
        const listOfSites = `https://raw.githubusercontent.com/mandymichael/mandyswebring/main/mandyswebring.json`;

        const template = document.createElement("template");
        template.innerHTML = `
        <style>
        .webring {
          padding: 1rem; 
          text-align: center;
          background: linear-gradient(149deg, rgba(88,57,109,1) 0%, rgba(196,48,132,1) 100%);
          font-family: Futura, helvetica, verdana, arial, sans-serif;
        }
        
        .copy {
            background: rgba(0,0,0,0.8);
            padding: 2rem;
            color: #fff;
        }
        
        h1 {
            text-transform: uppercase;
            font-size: 1.25rem;
            font-weight: 400;
            letter-spacing: 0.2ch;
            margin: 0;
        }
        p {
            font-weight: 400;
            line-height: 1.4;
            letter-spacing: 0.1ch;
        }
        
        p a {
         color: #e43575;
        }
        
        p a:hover {
         color: #5dacbf;
        }

        ul {
            list-style: none;
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 0;
            padding: 0;
        }
        
        nav a {
            background: #e43575;
            color: #fff;
            padding: 0.5rem;
            display: inline-block;
            border-radius: 3px;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 0.2ch;
            transition: background 150ms ease;
        }
        
        nav a:hover {
            background: #5dacbf;
        }
        </style>
        
        <aside class="webring">
          <div id="content" class="copy">
          
          </div>
        </aside>`;
        
        class WebRing extends HTMLElement {
            connectedCallback() {
                this.attachShadow({ mode: "open" });
        
                this.shadowRoot.appendChild(template.content.cloneNode(true));
                const currentSite = this.getAttribute("site");
        
                fetch(listOfSites)
                    .then((response) => response.json())
                    .then((sites) => {
                        const matchedSiteIndex = sites.findIndex(
                            (site) => site.url === currentSite
                        );
                        const matchedSite = sites[matchedSiteIndex];
        
                        let prevSiteIndex = matchedSiteIndex - 1;
                        if (prevSiteIndex === -1) prevSiteIndex = sites.length - 1;
        
                        let nextSiteIndex = matchedSiteIndex + 1;
                        if (nextSiteIndex > sites.length - 1) nextSiteIndex = 0;

                        const getRandomNumber = this.getRandomInt(0, sites.length - 1);

                        let randomSiteIndex = getRandomNumber;
                        if (getRandomNumber === matchedSiteIndex) randomSiteIndex = prevSiteIndex;
        
                        const cp = `
                          <h1>Mandy's Webring</h1>
                          <p>
                            You are visiting <a href="${matchedSite.url}">${matchedSite.name}</a>  by ${matchedSite.owner}
                          </p>
                          <nav>
                            <ul>
                                <li><a href="${sites[prevSiteIndex].url}">Prev</a></li>
                                <li><a href="${sites[nextSiteIndex].url}">Next</a></li>
                                <li><a href="${sites[randomSiteIndex].url}">Random</a></li>
                            </ul>
                          </nav>
                        `;
        
                        this.shadowRoot.querySelector("#content").insertAdjacentHTML("afterbegin", cp);
                    });
            }
        
            getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
        
        window.customElements.define("mandys-webring", WebRing);
        
    }, [])
    return (
        <mandys-webring site="https://textlab.dev"></mandys-webring>
    )
  }