/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

import {bootstrapExtra} from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

let currentPopup: any = undefined;

const today = new Date();
const time = today.getHours() + ":" + today.getMinutes();

WA.room.onEnterLayer('clockZone').subscribe(() => {
    currentPopup =  WA.ui.openPopup("clockPopup","It's " + time,[]);
})

WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}


let helloWorldPopup: any = undefined;

// Open the popup when we enter a given zone
WA.room.onEnterLayer("needHelpZone").subscribe(() => {
    helloWorldPopup = WA.ui.openPopup("needHelpPopup", 'Vous êtes perdu·e, vous avez une question ? Rapprochez-vous des Zenika, ils sont facilement repérables avec leur sweat rouge!', []);
});

// Close the popup when we leave the zone.
WA.room.onLeaveLayer("needHelpZone").subscribe(() => {
    helloWorldPopup.close();
})


let socialNetworkPopup: any = undefined;

// Open the popup when we enter a given zone
WA.room.onEnterLayer("followUsZone").subscribe(() => {
    socialNetworkPopup = WA.ui.openPopup("followUsPopup", 'Envie de nous suivre sur les réseaux ou de communiquer sur votre journée? #zenikaNEXTconf', [
    {
        label: "twitter",
        className: "primary",
        callback: (popup) => {
            WA.nav.openTab("https://twitter.com/zenikait"); 
        }
    },
    {
        label: "linkedin",
        className: "primary",
        callback: (popup) => {
            WA.nav.openTab("https://www.linkedin.com/company/zenika/"); 
        }
    }]);
});

// Close the popup when we leave the zone.
WA.room.onLeaveLayer("followUsZone").subscribe(() => {
    socialNetworkPopup.close();
})