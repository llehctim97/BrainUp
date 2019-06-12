"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HairstyleService = /** @class */ (function () {
    function HairstyleService() {
        this.hairstyles = [
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
    }
    HairstyleService.prototype.getAllHairstyles = function () {
        return this.hairstyles;
    };
    HairstyleService.prototype.getHairstyle = function (gender_id, hair_id) {
        return this.hairstyles[gender_id][hair_id];
    };
    HairstyleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], HairstyleService);
    return HairstyleService;
}());
exports.HairstyleService = HairstyleService;
var GlassesService = /** @class */ (function () {
    function GlassesService() {
        this.glasses = [
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
    }
    GlassesService.prototype.getAllGlasses = function () {
        return this.glasses; // The same for both genders
    };
    GlassesService.prototype.getGlasses = function (gender_id, glasses_id) {
        return this.glasses[gender_id][glasses_id];
    };
    GlassesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], GlassesService);
    return GlassesService;
}());
exports.GlassesService = GlassesService;
var BodyService = /** @class */ (function () {
    function BodyService() {
        this.bodies = [
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
    }
    BodyService.prototype.getBody = function (gender_id) {
        return this.bodies[gender_id];
    };
    BodyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], BodyService);
    return BodyService;
}());
exports.BodyService = BodyService;
var FaceService = /** @class */ (function () {
    function FaceService() {
        this.faces = [
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
    }
    FaceService.prototype.getFace = function (gender_id) {
        return this.faces[gender_id];
    };
    FaceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FaceService);
    return FaceService;
}());
exports.FaceService = FaceService;
var ShirtService = /** @class */ (function () {
    function ShirtService() {
        this.shirts = [
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
    }
    ShirtService.prototype.getAllShirts = function () {
        return this.shirts;
    };
    ShirtService.prototype.getShirt = function (gender_id, shirt_id) {
        return this.shirts[gender_id][shirt_id];
    };
    ShirtService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ShirtService);
    return ShirtService;
}());
exports.ShirtService = ShirtService;
var PantsService = /** @class */ (function () {
    function PantsService() {
        this.pants = [
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
    }
    PantsService.prototype.getAllPants = function () {
        return this.pants;
    };
    PantsService.prototype.getPants = function (gender_id, pants_id) {
        return this.pants[gender_id][pants_id];
    };
    PantsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], PantsService);
    return PantsService;
}());
exports.PantsService = PantsService;
var ShoesService = /** @class */ (function () {
    function ShoesService() {
        this.shoes = [
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
    }
    ShoesService.prototype.getAllShoes = function () {
        return this.shoes;
    };
    ShoesService.prototype.getShoes = function (gender_id, shoes_id) {
        return this.shoes[gender_id][shoes_id];
    };
    ShoesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ShoesService);
    return ShoesService;
}());
exports.ShoesService = ShoesService;
var WatchService = /** @class */ (function () {
    function WatchService() {
        this.watches = [
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
    }
    WatchService.prototype.getAllWatches = function () {
        return this.watches;
    };
    WatchService.prototype.getWatch = function (gender_id, watch_id) {
        return this.watches[gender_id][watch_id];
    };
    WatchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], WatchService);
    return WatchService;
}());
exports.WatchService = WatchService;
var OutfitService = /** @class */ (function () {
    function OutfitService() {
        this.outfits = [
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
        this.outfitsAuthority = [
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
    }
    OutfitService.prototype.getAllOutfits = function (is_Authority) {
        console.log("In Item Service: Pers principle is authority: " + is_Authority);
        if (is_Authority) {
            return this.outfitsAuthority;
        }
        else {
            return this.outfits;
        }
    };
    OutfitService.prototype.getOutfit = function (gender_id, profession_id) {
        return this.outfits[gender_id][profession_id];
    };
    OutfitService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], OutfitService);
    return OutfitService;
}());
exports.OutfitService = OutfitService;
//# sourceMappingURL=questionnaireItemServices.js.map