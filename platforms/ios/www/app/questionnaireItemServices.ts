import { Injectable } from '@angular/core';

@Injectable()
export class HairstyleService {

  hairstyles = [
    [
      {
        image: 'img/hairstyles/hairstyle_1_male.svg',
        image_picker: 'img/hairstyles/hairstyle_1_male_picker.svg',
        image_eyebrows: 'img/eyebrows/eyebrows_1_male.svg',
        image_eyebrows_timepressure: 'img/eyebrows/eyebrows_1_male_timepressure.svg',
        id: 'hairstyle_male_1'
      },
      {
        image: 'img/hairstyles/hairstyle_2_male.svg',
        image_picker: 'img/hairstyles/hairstyle_2_male_picker.svg',
        image_eyebrows: 'img/eyebrows/eyebrows_2_male.svg',
        image_eyebrows_timepressure: 'img/eyebrows/eyebrows_2_male_timepressure.svg',
        id: 'hairstyle_male_2'
      },
      {
        image: 'img/hairstyles/hairstyle_3_male.svg',
        image_picker: 'img/hairstyles/hairstyle_3_male_picker.svg',
        image_eyebrows: 'img/eyebrows/eyebrows_3_male.svg',
        image_eyebrows_timepressure: 'img/eyebrows/eyebrows_3_male_timepressure.svg',
        image_hat: 'img/hairstyles/hairstyle_3_male_hat.svg',
        id: 'hairstyle_male_3'
      }
    ],
    [
      {
        image: 'img/hairstyles/hairstyle_1_female.svg',
        image_picker: 'img/hairstyles/hairstyle_1_female_picker.svg',
        image_eyebrows: 'img/eyebrows/eyebrows_1_female.svg',
        image_eyebrows_timepressure: 'img/eyebrows/eyebrows_1_female_timepressure.svg',
        id: 'hairstyle_female_1'
      },
      {
        image: 'img/hairstyles/hairstyle_2_female.svg',
        image_picker: 'img/hairstyles/hairstyle_2_female_picker.svg',
        image_eyebrows: 'img/eyebrows/eyebrows_2_female.svg',
        image_eyebrows_timepressure: 'img/eyebrows/eyebrows_2_female_timepressure.svg',
        id: 'hairstyle_female_2'
      },
      {
        image: 'img/hairstyles/hairstyle_3_female.svg',
        image_picker: 'img/hairstyles/hairstyle_3_female_picker.svg',
        image_eyebrows: 'img/eyebrows/eyebrows_3_female.svg',
        image_eyebrows_timepressure: 'img/eyebrows/eyebrows_3_female_timepressure.svg',
        id: 'hairstyle_female_3'
      }      
    ]
  ];


  constructor() {
  	
  }
  
  getAllHairstyles() {
    return this.hairstyles;
  }

  getHairstyle(gender_id: number, hair_id: number) {
    return this.hairstyles[gender_id][hair_id];
  }
} 


@Injectable()
export class GlassesService {

  glasses = [
    [
      {
        image: 'img/glasses/glasses_1_male.svg',
        image_picker: 'img/glasses/glasses_1_male_picker.svg',
        id: 'glasses_male_1'
      },
      {
        image: 'img/glasses/glasses_2_male.svg',
        image_picker: 'img/glasses/glasses_2_male_picker.svg',
        id: 'glasses_male_2'
      },
      {
        image: 'img/glasses/glasses_3_male.svg',
        image_picker: 'img/glasses/glasses_3_male_picker.svg',
        id: 'glasses_male_3'
      },
      {
        image: 'img/glasses/glasses_none.svg',
        image_picker: 'img/glasses/glasses_none_picker.svg',
        id: 'glasses_none'
      }      
    ],
    [
      {
        image: 'img/glasses/glasses_1_female.svg',
        image_picker: 'img/glasses/glasses_1_female_picker.svg',
        id: 'glasses_female_1'
      },
      {
        image: 'img/glasses/glasses_2_female.svg',
        image_picker: 'img/glasses/glasses_2_female_picker.svg',
        id: 'glasses_female_2'
      },
      {
        image: 'img/glasses/glasses_3_female.svg',
        image_picker: 'img/glasses/glasses_3_female_picker.svg',
        id: 'glasses_female_3'
      },
      {
        image: 'img/glasses/glasses_none.svg',
        image_picker: 'img/glasses/glasses_none_picker.svg',
        id: 'glasses_none'
      }
    ]
  ];
  
  constructor() {
    
  }
  
  getAllGlasses() {
    return this.glasses; // The same for both genders
  }

  getGlasses(gender_id: number, glasses_id: number) {
    return this.glasses[gender_id][glasses_id];
  }
} 

@Injectable()
export class BodyService {

  bodies = [
    {
      image: 'img/body/body_male.svg',
      image_timepressure: 'img/body/body_male_timepressure.svg',
      image_timepressure_arm: 'img/body/body_male_timepressure_arm.svg',
      image_nopants: 'img/body/body_male_nopants.svg',
      id: 'body_male'
    },
    {
      image: 'img/body/body_female.svg',
      image_timepressure: 'img/body/body_female_timepressure.svg',
      image_timepressure_arm: 'img/body/body_female_timepressure_arm.svg',
      image_nopants: 'img/body/body_female_nopants.svg',
      id: 'body_female'
    }
  ];

  
  constructor() {
    
  }
  
  getBody(gender_id: number) {
    return this.bodies[gender_id];
  }
} 

@Injectable()
export class FaceService {

  faces = [
    {
      image: 'img/faces/face_male.svg',      
      image_timepressure: 'img/faces/face_male_timepressure.svg',
      id: 'face_male'
    },
    {
      image: 'img/faces/face_female.svg',
      image_timepressure: 'img/faces/face_female_timepressure.svg',
      id: 'face_female'
    }
  ];

  
  constructor() {
    
  }
  
  getFace(gender_id: number) {
    return this.faces[gender_id];
  }
} 

@Injectable()
export class ShirtService {

  shirts = [
    [
      {
        image: 'img/shirts/shirt_1_male.svg',
        id: 'shirt_male_1'
      },
      {
        image: 'img/shirts/shirt_2_male.svg',
        id: 'shirt_male_2'
      },
      {
        image: 'img/shirts/shirt_3_male.svg',
        id: 'shirt_male_3'
      }
    ],
    [
      {
        image: 'img/shirts/shirt_1_female.svg',
        image_timepressure: 'img/shirts/shirt_1_female_timepressure.svg',
        id: 'shirt_female_1'
      },
      {
        image: 'img/shirts/shirt_2_female.svg',
        id: 'shirt_female_2'
      },
      {
        image: 'img/shirts/shirt_3_female.svg',
        id: 'shirt_female_3'
      }
    ]
  ];
  
  constructor() {
    
  }
  
  getAllShirts() {
    return this.shirts;
  }

  getShirt(gender_id: number, shirt_id: number) {
    return this.shirts[gender_id][shirt_id];
  }
} 

@Injectable()
export class PantsService {

  pants = [
    [
      {
        image: 'img/pants/pants_1_male.svg',
        image_picker: 'img/pants/pants_1_male_picker.svg',
        id: 'pants_male_1'
      },
      {
        image: 'img/pants/pants_2_male.svg',
        image_picker: 'img/pants/pants_2_male_picker.svg',
        id: 'pants_male_2'
      },
      {
        image: 'img/pants/pants_3_male.svg',
        image_picker: 'img/pants/pants_3_male_picker.svg',
        id: 'pants_male_3'
      }
    ],
    [
      {
        image: 'img/pants/pants_1_female.svg',
        image_picker: 'img/pants/pants_1_female_picker.svg',
        id: 'pants_female_1'
      },
      {
        image: 'img/pants/pants_2_female.svg',
        image_picker: 'img/pants/pants_2_female_picker.svg',
        id: 'pants_female_2'
      },
      {
        image: 'img/pants/pants_3_female.svg',
        image_picker: 'img/pants/pants_3_female_picker.svg',
        id: 'pants_female_3'
      }
    ]
  ];
  
  constructor() {
    
  }
  
  getAllPants() {
    return this.pants;
  }

  getPants(gender_id: number, pants_id: number) {
    return this.pants[gender_id][pants_id];
  }
} 

@Injectable()
export class ShoesService {

  shoes = [
    [
      {
        image: 'img/shoes/shoes_1_male.svg',
        image_picker: 'img/shoes/shoes_1_male_picker.svg',
        id: 'shoes_male_1'
      },
      {
        image: 'img/shoes/shoes_2_male.svg',
        image_picker: 'img/shoes/shoes_2_male_picker.svg',
        id: 'shoes_male_2'
      },
      {
        image: 'img/shoes/shoes_3_male.svg',
        image_picker: 'img/shoes/shoes_3_male_picker.svg',
        id: 'shoes_male_3'
      }
    ],
    [
      {
        image: 'img/shoes/shoes_1_female.svg',
        image_picker: 'img/shoes/shoes_1_female_picker.svg',
        id: 'shoes_female_1'
      },
      {
        image: 'img/shoes/shoes_2_female.svg',
        image_picker: 'img/shoes/shoes_2_female_picker.svg',
        id: 'shoes_female_2'
      },
      {
        image: 'img/shoes/shoes_3_female.svg',
        image_picker: 'img/shoes/shoes_3_female_picker.svg',
        id: 'shoes_female_3'
      }
    ]
  ];
  
  constructor() {
    
  }
  
  getAllShoes() {
    return this.shoes;
  }

  getShoes(gender_id: number, shoes_id: number) {
    return this.shoes[gender_id][shoes_id];
  }
} 


@Injectable()
export class WatchService {

  watches = [
    [
      {
        image: 'img/watches/watch_1_male.svg',
        image_timepressure: 'img/watches/watch_1_male_timepressure.svg',
        image_picker: 'img/watches/watch_1_picker.svg',
        id: 'watch_1'
      },
      {
        image: 'img/watches/watch_2_male.svg',
        image_timepressure: 'img/watches/watch_2_male_timepressure.svg',
        image_picker: 'img/watches/watch_2_picker.svg',
        id: 'watch_2'
      },
      {
        image: 'img/watches/watch_3_male.svg',
        image_timepressure: 'img/watches/watch_3_male_timepressure.svg',
        image_picker: 'img/watches/watch_3_picker.svg',
        id: 'watch_3'
      }
    ],
    [
      {
        image: 'img/watches/watch_1_female.svg',
        image_timepressure: 'img/watches/watch_1_female_timepressure.svg',
        image_picker: 'img/watches/watch_1_picker.svg',
        id: 'watch_1'
      },
      {
        image: 'img/watches/watch_2_female.svg',
        image_timepressure: 'img/watches/watch_2_female_timepressure.svg',
        image_picker: 'img/watches/watch_2_picker.svg',
        id: 'watch_2'
      },
      {
        image: 'img/watches/watch_3_female.svg',
        image_timepressure: 'img/watches/watch_3_female_timepressure.svg',
        image_picker: 'img/watches/watch_3_picker.svg',
        id: 'watch_3'
      }
    ]
  ];
  
  constructor() {
    
  }
  
  getAllWatches() {
    return this.watches;
  }

  getWatch(gender_id: number, watch_id: number) {
    return this.watches[gender_id][watch_id];
  }
} 

@Injectable()
export class OutfitService {

  outfits = [
    [
      {
        image: 'img/outfits/doctor_male.svg',
        profession_id: 0,
        profession_name: 'Doctor',
        id: 'doctor_male'
      },
      {
        image: 'img/outfits/professor_male.svg',
        profession_id: 1,
        profession_name: 'Professor',
        alternate_body: 'img/body/body_male_nohand.svg',
        id: 'professor_male'
      },
      {
        image: 'img/outfits/mechanic_male.svg',
        profession_id: 2,
        profession_name: 'Mechanic',
        id: 'mechanic_male'
      },
      {
        image: 'img/outfits/student_male.svg',
        profession_id: 3,
        profession_name: 'Student',
        id: 'student_male'
      }
    ],
    [
      {
        image: 'img/outfits/doctor_female.svg',
        profession_id: 0,
        profession_name: 'Doctor',        
        id: 'doctor_female'
      },
      {
        image: 'img/outfits/professor_female.svg',
        profession_id: 1,
        profession_name: 'Professor',        
        alternate_body: 'img/body/body_female_nohand.svg',
        id: 'professor_female'
      },
      {
        image: 'img/outfits/mechanic_female.svg',
        profession_id: 2,
        profession_name: 'Mechanic',        
        id: 'mechanic_female'
      },
      {
        image: 'img/outfits/student_female.svg',
        profession_id: 3,
        profession_name: 'Student',        
        id: 'student_female'
      }
    ]
  ];

  outfitsAuthority = [
    [
      {
        image: 'img/outfits/doctor_male.svg',
        profession_id: 0,
        profession_name: 'Doctor',
        id: 'doctor_male'
      },
      {
        image: 'img/outfits/professor_male.svg',
        profession_id: 1,
        profession_name: 'Professor',
        alternate_body: 'img/body/body_male_nohand.svg',
        id: 'professor_male'
      }
    ],
    [
      {
        image: 'img/outfits/doctor_female.svg',
        profession_id: 0,
        profession_name: 'Doctor',        
        id: 'doctor_female'
      },
      {
        image: 'img/outfits/professor_female.svg',
        profession_id: 1,
        profession_name: 'Professor',        
        alternate_body: 'img/body/body_female_nohand.svg',
        id: 'professor_female'
      }     
    ]
  ];
  
  constructor() {
    
  }
  
  getAllOutfits(is_Authority:boolean) {

    console.log("In Item Service: Pers principle is authority: " + is_Authority);
     
    if (is_Authority)
    {
        return this.outfitsAuthority;
    }
    else
    {
         return this.outfits;
    }    
  }

  getOutfit(gender_id: number, profession_id: number) {
    return this.outfits[gender_id][profession_id];
  }
} 