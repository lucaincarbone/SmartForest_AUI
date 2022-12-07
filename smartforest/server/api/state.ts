import { Appliances } from "../state_example/Toaster";
import Toaster = Appliances.Toaster;
var toaster = new Toaster()

export default defineEventHandler(() => {
    return GenerateRandomJson(toaster);
})


function GenerateRandomJson(toaster: Toaster) {
  //toaster.advanceState("hi,forest")
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

  