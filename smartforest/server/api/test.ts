import { Appliances } from "../state_example/Toaster";

export default defineEventHandler(() => {
    return GenerateRandomJson();
})


function GenerateRandomJson() {
  console.log("testing allowed transitions")
  var toaster = new Appliances.Toaster()
  toaster.insertBread()
  toaster.pullLever()
  toaster.ejectBread()
  toaster.removeBread()
  
  // console.log("testing disallowed transitions")
  // var toaster2 = new Appliances.Toaster()
  // toaster2.pullLever()


  //return json as example
    return {
        title: 'Mount Everest',
        description: "Mount Everest is Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point",
        height: '8,848 m',
        countries: [
          'China',
          'Nepal'
        ],
        continent: 'Asia',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Everest_kalapatthar.jpg/600px-Everest_kalapatthar.jpg',
        dir: '/mountains',
        path: '/mountains/mount-everest',
        slug: 'mount-everest',
        updatedAt: '2020-12-11T15:40:35.000Z'
      }
}

  