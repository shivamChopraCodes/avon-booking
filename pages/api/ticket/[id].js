const puppeteer = require('puppeteer');
const fs = require('fs');
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { serverbase64 } from '../../../src/binaryConverter';

async function printPDF(bookedFlight) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(
    `  <div id="page1-div" style="position: relative; width: 893px; height: 1250px">
      <img width="893" style="margin-top: 7px" height="1259" src="data:image/png;base64,${fs
        .readFileSync(process.cwd() + '/public/images/ticket/target001.png')
        .toString('base64')}" alt="background image">
      <p style="position: absolute; top: 211px; left: 43px; white-space: nowrap" class="ft10">
        -----------------------------------------------------------------------------------------
      </p>
      <img height="50px" src='data:image/png;base64,${fs
        .readFileSync(process.cwd() + '/public/images/ticket/logo.png')
        .toString('base64')}' alt="logo" style="position: absolute; top: 140px; left: 43px">
      <p style="position: absolute; top: 228px; left: 43px; white-space: nowrap" class="ft118">
        <b>Travel Summary<br></b>Traveler
      </p>
      <p style="position: absolute; top: 247px; left: 274px; white-space: nowrap" class="ft11">
        <b>${bookedFlight.title + ' ' + bookedFlight.firstnamep + ' ' + bookedFlight.lastnamep}</b>
      </p>
      <p style="position: absolute; top: 266px; left: 43px; white-space: nowrap" class="ft11"><b>Date</b></p>
      <p style="position: absolute; top: 266px; left: 109px; white-space: nowrap" class="ft11"><b>Dep. Time</b></p>
      <p style="position: absolute; top: 266px; left: 219px; white-space: nowrap" class="ft11"><b>From</b></p>
      <p style="position: absolute; top: 266px; left: 351px; white-space: nowrap" class="ft11"><b>To</b></p>
      <p style="position: absolute; top: 266px; left: 473px; white-space: nowrap" class="ft11"><b>Flight No</b></p>
      <p style="position: absolute; top: 266px; left: 572px; white-space: nowrap" class="ft11"><b>Terminal</b></p>
      <p style="position: absolute; top: 266px; left: 671px; white-space: nowrap" class="ft11"><b>Airline Name</b></p>
      <p style="position: absolute; top: 285px; left: 43px; white-space: nowrap" class="ft12">${
        bookedFlight.dateoftravel
      }</p>
      <p style="position: absolute; top: 285px; left: 109px; white-space: nowrap" class="ft12">0205</p>
      <p style="position: absolute; top: 285px; left: 219px; white-space: nowrap" class="ft12">${
        bookedFlight.departure
      }</p>
      <p style="position: absolute; top: 285px; left: 353px; white-space: nowrap" class="ft12">${
        bookedFlight.arrival
      }</p>
      <p style="position: absolute; top: 285px; left: 473px; white-space: nowrap" class="ft12">${
        bookedFlight.flightnumber
      }</p>
      <p style="position: absolute; top: 285px; left: 574px; white-space: nowrap" class="ft12">${
        bookedFlight.departureterminal
      }</p>
      <p style="position: absolute; top: 285px; left: 674px; white-space: nowrap" class="ft119">
        ${bookedFlight.airline}<br>AIR LINES
      </p>
      <p style="position: absolute; top: 363px; left: 43px; white-space: nowrap" class="ft10">
        -----------------------------------------------------------------------------------------
      </p>
      <p style="position: absolute; top: 377px; left: 43px; white-space: nowrap" class="ft13">.</p>
      <p style="position: absolute; top: 391px; left: 43px; white-space: nowrap; color: white !important;" class="ft14"><b>Your trip</b></p>
      <p style="position: absolute; top: 390px; left: 594px; white-space: nowrap; color: white !important;" class="ft15"><b>${
        bookedFlight.refnummberp
      }</b></p>
      <p style="position: absolute; top: 390px; left: 435px; white-space: nowrap; color: white !important;" class="ft16">Booking ref:</p>
      <p style="position: absolute; top: 390px; left: 706px; white-space: nowrap; color: white !important;" class="ft17">
        <a style="color: white; text-decoration: none; text-align: center" href="https://checkmytrip.app.link/retrieveV2=f-nDiXWHrgkzgSsh3HDsV5i1V81CHZxZpz0L0NqGEBPmbws9y3jFlBw8IQ4lFdFMGdiqWr-4dqPZfqeUMJIymApa2OwVJTLztF1eDhQVQhDZUV24803LS1CvOUEQQheWiLiDc45AEIPPk7qAzFuQDSOk68GR0ZM3aLz11tKXBl0&amp;N=o7qSLlkZF8aykLvq2h56eRmpBw0-5lbJxbDg1aTZ2bu0Vag4nzGk0y8Mn7aZKvZ-fKtfVduVLVW3gygBCgdnnACRJ9F2kTilmavPfzCTr3KFchF_XF01x-6rpk_mvYvs_oKVHiWQNuQyApTf1HfoFvVcwLVed3B-AkcnZZ267vY&amp;F=vKFEFN2ulb-ujnkAquuVbMwXriZZAAkTLPnf1KQOib9_gfSokJ_g_c3fmeVLRy-Gu3GbtJHXsvmjUj3YVpQgxjhREBWaF1hGF3Wc66fXbYOs4N_yA6adgaesn7LP11HIpcnCOfogrbnvt_1urYRmPrBiPdDKwVmOelBVe-ug8vU&amp;E=mwbeA0iHPkzvh5iPAcasAnNNTD0inKDzeubM0vPmzhxCZfpO8dY2LCu8au1N7TQhPW53tlPs2aso7quZuP1KbtKqSVt4OVrqMjZNA6YXpMhCDGdTbr_-mO08D3rFvu9QYcAHcXPGhdi31R-0V6mtTbm-RmAIWT7etcgSChZDkXc">CheckMyTrip&nbsp;App</a>
      </p>
      <p style="position: absolute; top: 409px; left: 706px; white-space: nowrap; color: white !important;" class="ft17">
        <a style="color: white; text-decoration: none; text-align: center" href="https://checkmytrip.app.link/e/VhSLhUDm6mb?R=kTpP35E7QfGoxcpRVq5aPG8tC-B9KpxxMnovhfn41I1R5PUGCcpqNlXl3deAUj2WA34pfb6gEdcPXErB8ulKiz93BQeL_FeZQxuXUYBzMwVzld2Iz8Zxxe8mgufqtq6nsiULskwKqw2xzbqfEv3k5Q-7mra8LQXFaG5AuT1fKKM&amp;N=o6xrAXGTt9rk0fIHdhL_05b2lTUvWd_4_e0U-prC509X8v6JddxVwXt9CChotT9DRO0XiazN_vAjZTWBRAMlgdyxAWUF_GsfmkrI7fGxaXQaCpKqnZc5VU87CIPx7I6Gw3Znnf8221eClV5XCTcZBrnLomY_8iyRlD734lqy4XI&amp;F=VEjA0O8fPynWEucQ83kfNWCKUg1_if1E2n7-b8HVzzsYdBR_fgcPeeKXjZSC2je5lZPWqlehEl4KrvMocch9XhTqFB3-1b-nfmfAF0-Pg4CnPOyythN59sn4fv_EekCGrAcv_BdzXgToqmehXyn2H_WzoIPeooPSm-jTCZ2fszE&amp;E=DYIF6z9lU4Th44b5K3r38DCdPseO9AENzcWYvqE6cKt5hUbhyPgpYY8SHDaOzYRWpeo0RLwC6tlE_vrwNogPdqM6vKuJ5ScTriXnm7xC0PIXoGANPpbeoeUhYpCBGqimja-lQIKbwLnm0rRinEQ5z9lmszpTbFuPW-Us4nfXJec">Trip&nbsp;in&nbsp;Messenger</a>
      </p>
      <p style="position: absolute; top: 429px; left: 435px; white-space: nowrap; color: white !important;" class="ft16">
        Document Issue Date:&nbsp;<b>${bookedFlight.updatedat}</b>
      </p>
      <p style="position: absolute; top: 448px; left: 594px; white-space: nowrap" class="ft15"><b>2023</b></p>
      <p style="position: absolute; top: 464px; left: 43px; white-space: nowrap" class="ft13">.</p>
      <p style="position: absolute; top: 474px; left: 43px; white-space: nowrap" class="ft18">.</p>
      <p style="position: absolute; top: 487px; left: 43px; white-space: nowrap" class="ft12">Traveler</p>
      <p style="position: absolute; top: 487px; left: 144px; white-space: nowrap" class="ft11">
        <b>${bookedFlight.title + ' ' + bookedFlight.firstnamep + ' ' + bookedFlight.lastnamep}</b>
      </p>
      <p style="position: absolute; top: 487px; left: 441px; white-space: nowrap" class="ft12">Agency</p>
      <p style="position: absolute; top: 487px; left: 571px; white-space: nowrap" class="ft19">
        <b>${bookedFlight.agencyname}</b>
      </p>
      <p style="position: absolute; top: 506px; left: 571px; white-space: nowrap" class="ft120">
        <b>${bookedFlight.agencyaddress}</b>
      </p>
      <p style="position: absolute; top: 560px; left: 441px; white-space: nowrap" class="ft12">Telephone</p>
      <p style="position: absolute; top: 560px; left: 571px; white-space: nowrap" class="ft19"><b>${
        bookedFlight.agencyphone
      }</b></p>
      <p style="position: absolute; top: 579px; left: 441px; white-space: nowrap" class="ft12">Email</p>
      <p style="position: absolute; top: 579px; left: 571px; white-space: nowrap" class="ft19">
        <a href="mailto:${bookedFlight.agencyemail}"><b>${bookedFlight.agencyemail}</b></a>
      </p>
      <p style="position: absolute; top: 596px; left: 43px; white-space: nowrap" class="ft18">.</p>
      <p style="position: absolute; top: 611px; left: 43px; white-space: nowrap" class="ft110">
        Monday 09 January 2023
      </p>
      <img id="flight-company" width='40' height='40' src="data:image/png;base64,${serverbase64(
        bookedFlight.logo
      )}" style="position: absolute; top: 680px; left: 65px">
      <p style="position: absolute; top: 723px; left: 65px; white-space: nowrap" class="ft111">
        <a href="https://www.swiss.com/gb/en/profile/login">Check-in</a>
      </p>
      <p style="position: absolute; top: 644px; left: 144px; white-space: nowrap" class="ft11">
        <b>${bookedFlight.airline} ${bookedFlight.flightnumber}</b>
      </p>
      <p style="position: absolute; top: 680px; left: 144px; white-space: nowrap" class="ft112"><b>Departure</b></p>
      <p style="position: absolute; top: 680px; left: 234px; white-space: nowrap" class="ft112">
        <b>${bookedFlight.inventory.departuredate} ${bookedFlight.inventory.departuretime}</b>
      </p>
      <p style="position: absolute; top: 680px; left: 441px; white-space: nowrap" class="ft112">
        <b>Delhi,&nbsp;(Indira&nbsp;Gandhi&nbsp;Intl&nbsp;)&nbsp;</b><a href="https://checkmytrip.app.link/triptools/DEL">(+)</a>
      </p>
      <p style="position: absolute; top: 680px; left: 673px; white-space: nowrap" class="ft112">
        <b>Terminal:&nbsp;3</b>
      </p>
      <p style="position: absolute; top: 698px; left: 144px; white-space: nowrap" class="ft112"><b>Arrival</b></p>
      <p style="position: absolute; top: 698px; left: 234px; white-space: nowrap" class="ft112">
        <b>09&nbsp;January&nbsp;06:20</b>
      </p>
      <p style="position: absolute; top: 698px; left: 441px; white-space: nowrap" class="ft112">
        <b>Zurich,&nbsp;(Zurich&nbsp;Airport)&nbsp;</b><a href="https://checkmytrip.app.link/triptools/ZRH">(+)</a>
      </p>
      <p style="position: absolute; top: 716px; left: 144px; white-space: nowrap" class="ft114">Duration</p>
      <p style="position: absolute; top: 716px; left: 441px; white-space: nowrap" class="ft114">08:45 (Non stop)</p>
      <p style="position: absolute; top: 734px; left: 144px; white-space: nowrap" class="ft114">Booking status</p>
      <p style="position: absolute; top: 734px; left: 441px; white-space: nowrap" class="ft114">Confirmed</p>
      <p style="position: absolute; top: 752px; left: 144px; white-space: nowrap" class="ft114">Class</p>
      <p style="position: absolute; top: 752px; left: 441px; white-space: nowrap" class="ft114">Economy</p>
      <p style="position: absolute; top: 770px; left: 144px; white-space: nowrap" class="ft114">Equipment</p>
      <p style="position: absolute; top: 770px; left: 441px; white-space: nowrap" class="ft114">AIRBUS A330-300</p>
      <p style="position: absolute; top: 788px; left: 441px; white-space: nowrap" class="ft114">Breakfast/Meal</p>
      <p style="position: absolute; top: 788px; left: 144px; white-space: nowrap" class="ft114">Flight meal</p>
      <p style="position: absolute; top: 822px; left: 43px; white-space: nowrap" class="ft18">.</p>

      <p style="position: absolute; top: 830px; left: 144px; white-space: nowrap" class="ft115">
        <b>General&nbsp;Information</b>
      </p>
      <p style="position: absolute; top: 848px; left: 144px; white-space: nowrap" class="ft113">
        Have&nbsp;a&nbsp;nice&nbsp;flight&nbsp;!
      </p>
      <p style="position: absolute; top: 864px; left: 144px; white-space: nowrap" class="ft112">
        <b>Please&nbsp;reach&nbsp;Airport&nbsp;at&nbsp;least&nbsp;4&nbsp;hours&nbsp;before&nbsp;your&nbsp;departure&nbsp;time&nbsp;to&nbsp;ensure&nbsp;a&nbsp;smooth&nbsp;check-in.</b>
      </p>
      <p style="position: absolute; top: 880px; left: 144px; white-space: nowrap" class="ft112">
        <b>Greetings!!&nbsp;Avon&nbsp;Travels...</b>
      </p>
      <p style="position: absolute; top: 898px; left: 43px; white-space: nowrap" class="ft18">.</p>
      <p style="position: absolute; top: 907px; left: 144px; white-space: nowrap" class="ft11">
        <b>Airline Booking Reference(s)</b>
      </p>
      <p style="position: absolute; top: 925px; left: 144px; white-space: nowrap" class="ft114">
        LX (Swiss International Air Lines): NYC955
      </p>
      <p style="position: absolute; top: 935px; left: 43px; white-space: nowrap" class="ft18">.</p>
      <p style="position: absolute; top: 955px; left: 146px; white-space: nowrap" class="ft115">
        <b>COVID-19&nbsp;Guidelines&nbsp;for:</b>
      </p>
      <p style="position: absolute; top: 955px; left: 330px; white-space: nowrap" class="ft116">
        <b>Zurich,&nbsp;Switzerland</b>
      </p>
      <p style="position: absolute; top: 1000px; left: 146px; white-space: nowrap" class="ft20">
        Vaccination&nbsp;Required?
      </p>
      <p style="position: absolute; top: 1000px; left: 272px; white-space: nowrap" class="ft21">
        No,&nbsp;<a href="https://www.bag.admin.ch/bag/en/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov-div">Please&nbsp;check&nbsp;here&nbsp;for&nbsp;more&nbsp;details.</a>
      </p>
      <p style="position: absolute; top: 1020px; left: 146px; white-space: nowrap" class="ft20">
        Document&nbsp;Required?
      </p>
      <p style="position: absolute; top: 1020px; left: 265px; white-space: nowrap" class="ft21">Yes.</p>
      <p style="position: absolute; top: 1047px; left: 146px; white-space: nowrap" class="ft24">
        *Information displayed comes from external sources and may not be accurate with the latest regulations to
        travel. We recommend that you check<br>the travel requirements with local authorities before you travel.
      </p>
    </div>`,
    { waitUntil: 'networkidle0' }
  );
  await page.addStyleTag({
    content: `#page1-div p {
  margin: 0;
  padding: 0;
}
.ft10 {
  font-size: 13px;
  font-family: Courier;
  color: #000000;
}
.ft20 {
  font-size: 9px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft21 {
  font-size: 9px;
  font-family: Helvetica;
  color: #800000;
}
.ft22 {
  font-size: 8px;
  font-family: Helvetica;
  color: #000000;
}
.ft23 {
  font-size: 10px;
  font-family: Helvetica;
  color: #000000;
}
.ft24 {
  font-size: 8px;
  line-height: 13px;
  font-family: Helvetica;
  color: #000000;
}
 .ft11 {
  font-size: 13px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft12 {
  font-size: 13px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft13 {
  font-size: 4px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft14 {
  font-size: 22px;
  font-family: Helvetica;
  color: #fcfff5;
}
.ft15 {
  font-size: 13px;
  font-family: Helvetica;
  color: #fcfff5;
}
.ft16 {
  font-size: 13px;
  font-family: Helvetica;
  color: #fcfff5;
}
.ft17 {
  font-size: 11px;
  font-family: Helvetica;
  color: #fcfff5;
}
.ft18 {
  font-size: 4px;
  font-family: Helvetica;
  color: #ffffff;
}
.ft19 {
  font-size: 11px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft110 {
  font-size: 14px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft111 {
  font-size: 11px;
  font-family: Helvetica;
  color: #0000ff;
}
.ft112 {
  font-size: 9px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft113 {
  font-size: 9px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft114 {
  font-size: 10px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft115 {
  font-size: 12px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft116 {
  font-size: 12px;
  font-family: Helvetica;
  color: #800000;
}
.ft117 {
  font-size: 10px;
  font-family: Helvetica;
  color: #000000;
}
.ft118 {
  font-size: 13px;
  line-height: 19px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft119 {
  font-size: 13px;
  line-height: 19px;
  font-family: Helvetica;
  color: #2a366e;
}
.ft120 {
  font-size: 11px;
  line-height: 18px;
  font-family: Helvetica;
  color: #2a366e;
}
`,
  });
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdf;
}

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.json({ error: `Authentication failed.` });
    return;
  }
  if (req.method === 'GET') {
    const prisma = new PrismaClient();
    try {
      const bookedFlight = await prisma.booknow.findFirst({
        where: {
          idbooknow: +req.query.id,
          hiddenshow: 'Show',
        },
        select: {
          idbooknow: true,
          refnummberp: true,
          cabinp: true,
          flightnumber: true,
          pnr: true,
          duration: true,
          createdat: true,
          updatedat: true,
          tax: true,
          discount: true,
          discountcoupon: true,
          basicfare: true,
          totalfare: true,
          netfare: true,
          arrival: true,
          aircraft: true,
          departure: true,
          dateoftravel: true,
          title: true,
          firstnamep: true,
          lastnamep: true,
          typep: true,
          genderp: true,
          status: true,
          departureterminal: true,
          arrivalterminal: true,
          airline: true,
          agencyname: true,
          agencyaddress: true,
          agencyemail: true,
          agencyphone: true,
          inventory: {
            select: {
              flightcompany: true,
              departuredate: true,
              arrivaldate: true,
              departureairpot: true,
              departuretime: true,
              arrivalairpot: true,
              arrivaltime: true,
            },
          },
        },
      });
      if (!bookedFlight) {
        res.status(400);
        res.json({ error: `Booking not found` });
        return;
      }
      const logo = await prisma.flightdetails.findFirst({
        where: {
          hiddenshow: 'Show',
          company: bookedFlight.inventory.flightcompany,
        },
        select: {
          logo: true,
        },
      });
      console.log({ bookedFlight: bookedFlight.status, logo });
      if (bookedFlight.status.toLowerCase() !== 'approved') {
        res.status(400);
        res.json({ error: `Booking is not processed` });
        return;
      }
      await printPDF({ ...bookedFlight, logo: logo.logo }).then((pdf) => {
        // res.headers['Content-Type'] = 'application/pdf';
        // res.headers['Content-Length'] = pdf.length;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdf.length);
        res.send({ pdf, success: true });
      });
      return res.end;
    } catch (err) {
      console.log(err);
      res.status(502);
      res.json({ error: `Unable to generate ticket. Please try again later.` });
      return;
    }
  }
}
