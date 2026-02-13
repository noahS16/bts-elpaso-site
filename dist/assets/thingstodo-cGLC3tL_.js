import"./menu-D7Fif6hX.js";import"./scroll-ClpmlOO1.js";const t=[{image:"/utils/images/gamescape.jpg",name:"Gamescape",description:"Located in east El Paso, Gamescape is a family-friendly arcade where you can play laser tag, bowling, arcade games, watch movies, and more.",siteLink:"https://www.cinemark.com/gamescape/tx-el-paso/gamescape-by-cinemark-at-el-paso",mapLink:"https://maps.app.goo.gl/7yZMPKf6ZvtjToMA6"},{image:"/utils/images/sun-city-kitty.jpg",name:"Sun City Kitty",description:"Located in west El Paso. Grab a coffee and play with some cats! You can book time slots ahead of time on their website.",siteLink:"https://suncitykitty.com/",mapLink:"https://maps.app.goo.gl/mv3as2mASERGLoj48"},{image:"/utils/images/scenic-drive.jpg",name:"Scenic Drive",description:"Take in a great view of El Paso and Juarez, MX along a 2-mile drive up the Franklin Mountains.",link:"",mapLink:"https://maps.app.goo.gl/yhbyXaMFzruBxQdw9"},{image:"/utils/images/serve.jpg",name:"Serve - Pickleball",description:"Located in west El Paso. Book a private court and enjoy some food and drinks while you play! Get access to indoor/outdoor courts, as well as ping pong tables.",siteLink:"https://serveep.com/",mapLink:"https://maps.app.goo.gl/7EngEeVBFPk4PbVF7"},{image:"/utils/images/top-golf.png",name:"Top Golf",description:"Located in west El Paso. Book a private bay and enjoy food and drinks while working on your golf swing!",siteLink:"https://topgolf.com/us/el-paso/",mapLink:"https://maps.app.goo.gl/tWhQmsCcvptCDnvX9"},{image:"/utils/images/escape-room.jpg",name:"Escape rooms",description:"Multiple escape room venues around the city. Most popular include Red Door Escape Room(East), Operation Outbreak(Central), and Escapology(West).",siteLink:""},{image:"/utils/images/museums.jpg",name:"Museums",description:"Learn about the history of El Paso or explore local art while experiencing what Downtown has to offer! Popular options include the El Paso Museum of Art, the El Paso Holocaust Museum, the El Paso Museum of History, and the award winning childrens' museum, La Nube.",miles:"",link:""},{image:"/utils/images/western-playland.jpg",name:"Western Playland",description:"Located just outside of west El Paso in Sunland Park, New Mexico. Amusement park with small rollercoasters, rides, and games.",siteLink:"https://westernplayland.com/",mapLink:"https://maps.app.goo.gl/AshJ7WhBN7puXDwt6"},{image:"/utils/images/el-centro.jpg",name:"El Centro District",description:"El Paso's original shopping district. Located in Downtown El Paso on El Paso Street and stretching all the way to the border. El Centro is home to a variety of local shops. Get a taste of the unique blend of cultures that make up El Paso.",siteLink:"https://downtownelpaso.com/el-centro/",mapLink:"https://maps.app.goo.gl/8Wh96Z6hQaCeFtte6"},{image:"/utils/images/hiking.jpg",name:"Hiking",description:"There are dozens of hiking trails around El Paso. Popular ones include the Tin Mines Trail and the Aztec Cave Trail in the Franklin Mountains. For more hiking options, check out the link!",siteLink:"https://www.alltrails.com/us/texas/el-paso"},{image:"/utils/images/old-mesilla.jpg",name:"Old Mesilla",description:"Located about 45 minutes outside of El Paso, Old Mesilla is a historic district with a variety of local shops and restaurants including the iconic 'La Posta' that has been in business for over 85 years. It's a great place to spend an afternoon exploring and trying some local cuisine.",mapLink:"https://maps.app.goo.gl/14KmpsSPRCm929hPA"},{image:"/utils/images/white-sands.jpg",name:"White Sands National Park",description:"About an hour and a half away from El Paso is a national Park with 275 square miles of white sand dunes. Sled rentals and picnic spots are available. Great place to recreate the Yet to Come MV.",siteLink:"https://www.nps.gov/whsa/index.htm",mapLink:"https://maps.app.goo.gl/yTLrXzVYBL4g3vwk8"},{image:"/utils/images/outlets.jpg",name:"Outlet Shoppes",description:"Located in west El Paso, shop at the many discounted stores around the mall.",siteLink:"https://www.theoutletshoppesatelpaso.com/",mapLink:"https://maps.app.goo.gl/Y2QTznP2WSYSgc5cA"}],s=document.getElementById("gridCardsContainer");t.forEach(e=>{const a=o(e);s.appendChild(a)});function o(e){const a=document.createElement("div");return a.className=`
    bg-white rounded-xl shadow-md overflow-hidden
    transition-transform duration-200 hover:-translate-y-1
  `,a.innerHTML=`
    <img
      src="${e.image}"
      alt="${e.name}"
      class="w-full h-44 object-cover"
    />

    <div class="p-4 flex flex-col gap-2">
        <div class="flex flex-row items-center justify-between">
            <h3 class="text-3xl font-bold">
                ${e.name}
            </h3>
            <div class="flex flex-row gap-2">
        ${e.mapLink?`
          <a
            href="${e.mapLink}"
            target="_blank"
            class="category-btn bg-red-500 text-white px-4 py-2 rounded-full font-bold whitespace-nowrap"
          >
            View map
          </a>
        `:""}

        ${e.siteLink?`
          <a
            href="${e.siteLink}"
            target="_blank"
            class="category-btn bg-purple-500 text-white px-4 py-2 rounded-full font-bold"
          >
            Website
          </a>
        `:""}
      </div>
        </div>
      

      <p class=" leading-snug">
        ${e.description}
      </p>

    </div>
  `,a}
