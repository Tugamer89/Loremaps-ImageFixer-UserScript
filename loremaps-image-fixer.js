// ==UserScript==
// @name         Loremaps image fixer
// @namespace    https://loremaps.azurewebsites.net
// @version      0.1
// @description  Fix photo viewing
// @author       Tugamer89
// @match        https://loremaps.azurewebsites.net/Maps/Faerun
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function fixImageURLs() {
        const images = document.querySelectorAll("img");
        images.forEach((image) => {
            ["src", "src-data", "srcset"].forEach((attribute) => {
                const srcValue = image.getAttribute(attribute);
                if (srcValue) {
                    if (attribute === "srcset") {
                    const modifiedSrcset = srcValue.split(',').map(srcsetPart => {
                        const srcsetUrl = srcsetPart.trim().split(' ')[0];
                        const regex = /\.(jpg|png|svg)/i;
                        const match = srcsetUrl.match(regex);

                        if (match) {
                            const newSrcsetUrl = srcsetUrl.substring(0, match.index + match[0].length);
                            return newSrcsetUrl + ' ' + srcsetPart.trim().split(' ')[1];
                        }
                        return srcsetPart.trim();
                    });

                    const newSrcsetValue = modifiedSrcset.join(', ');
                    image.setAttribute(attribute, newSrcsetValue);
                    } else {
                        const regex = /\.(jpg|png|svg)/i;
                        const match = srcValue.match(regex);

                        if (match) {
                            const newSrc = srcValue.substring(0, match.index + match[0].length);
                            image.setAttribute(attribute, newSrc);
                        }
                    }
                }
            });
        });
    }

    fixImageURLs();
    setInterval(fixImageURLs, 500);
})();
