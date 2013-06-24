/*global define */
define(['angular', 'jquery', 'angular-modal'], function (angular, $, angular_modal) {
    'use strict';
    var mock = [
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage6.s3.amazonaws.com/36e03010daa311e2abd122000ae907cd_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage6.s3.amazonaws.com/36e03010daa311e2abd122000ae907cd_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "15sfest",
          "carpet"
        ],
        "location": null,
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": "Normal",
        "created_time": "1371840530",
        "link": "http://instagram.com/p/a1OZkkmQj2/",
        "likes": {
          "count": 0,
          "data": []
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage6.s3.amazonaws.com/36e03010daa311e2abd122000ae907cd_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage6.s3.amazonaws.com/36e03010daa311e2abd122000ae907cd_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage6.s3.amazonaws.com/36e03010daa311e2abd122000ae907cd_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371840542",
          "text": "#15sFest #carpet",
          "from": {
            "username": "stefannagey",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
            "id": "229021601",
            "full_name": "Stefan Nagey"
          },
          "id": "483355961966791468"
        },
        "type": "video",
        "id": "483355864918984950_229021601",
        "user": {
          "username": "stefannagey",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
          "full_name": "Stefan Nagey",
          "bio": "",
          "id": "229021601"
        },
        "_id": "51c4a80fce9d4ffe6a000001"
      },
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage3.s3.amazonaws.com/14d2f4c6daa311e2952222000ae912d7_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage3.s3.amazonaws.com/14d2f4c6daa311e2952222000ae912d7_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "slowpan",
          "15sfest"
        ],
        "location": null,
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": null,
        "created_time": "1371840473",
        "link": "http://instagram.com/p/a1OSmRmQjn/",
        "likes": {
          "count": 0,
          "data": []
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage3.s3.amazonaws.com/14d2f4c6daa311e2952222000ae912d7_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage3.s3.amazonaws.com/14d2f4c6daa311e2952222000ae912d7_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage3.s3.amazonaws.com/14d2f4c6daa311e2952222000ae912d7_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371840487",
          "text": "#15sfest #slowpan",
          "from": {
            "username": "stefannagey",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
            "id": "229021601",
            "full_name": "Stefan Nagey"
          },
          "id": "483355501759367942"
        },
        "type": "video",
        "id": "483355385711364327_229021601",
        "user": {
          "username": "stefannagey",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
          "full_name": "Stefan Nagey",
          "bio": "",
          "id": "229021601"
        },
        "_id": "51c4a80fce9d4ffe6a000002"
      },
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage7.s3.amazonaws.com/d2335bf2daa111e2aff022000a1f90b2_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage7.s3.amazonaws.com/d2335bf2daa111e2aff022000a1f90b2_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "boring",
          "15sfest"
        ],
        "location": null,
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": null,
        "created_time": "1371839932",
        "link": "http://instagram.com/p/a1NQhlGQhL/",
        "likes": {
          "count": 0,
          "data": []
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage7.s3.amazonaws.com/d2335bf2daa111e2aff022000a1f90b2_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage7.s3.amazonaws.com/d2335bf2daa111e2aff022000a1f90b2_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage7.s3.amazonaws.com/d2335bf2daa111e2aff022000a1f90b2_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371839944",
          "text": "#15sfest #boring",
          "from": {
            "username": "stefannagey",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
            "id": "229021601",
            "full_name": "Stefan Nagey"
          },
          "id": "483350941074524616"
        },
        "type": "video",
        "id": "483350845184346187_229021601",
        "user": {
          "username": "stefannagey",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
          "full_name": "Stefan Nagey",
          "bio": "",
          "id": "229021601"
        },
        "_id": "51c4a80fce9d4ffe6a000003"
      },
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage9.s3.amazonaws.com/bb3caa70da9211e2952e22000a9f3cf3_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage9.s3.amazonaws.com/bb3caa70da9211e2952e22000a9f3cf3_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "vultures",
          "15sfest"
        ],
        "location": null,
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": null,
        "created_time": "1371833451",
        "link": "http://instagram.com/p/a1A5Y3GQqt/",
        "likes": {
          "count": 1,
          "data": [
            {
              "username": "qorvis",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_247773590_75sq_1365111214.jpg",
              "id": "247773590",
              "full_name": "Qorvis Communications"
            }
          ]
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage9.s3.amazonaws.com/bb3caa70da9211e2952e22000a9f3cf3_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage9.s3.amazonaws.com/bb3caa70da9211e2952e22000a9f3cf3_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage9.s3.amazonaws.com/bb3caa70da9211e2952e22000a9f3cf3_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371833482",
          "text": "#vultures #15sfest @qorvis",
          "from": {
            "username": "stefannagey",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
            "id": "229021601",
            "full_name": "Stefan Nagey"
          },
          "id": "483296741590370719"
        },
        "type": "video",
        "id": "483296478716562093_229021601",
        "user": {
          "username": "stefannagey",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
          "full_name": "Stefan Nagey",
          "bio": "",
          "id": "229021601"
        },
        "_id": "51c4a80fce9d4ffe6a000004"
      },
      {
        "attribution": null,
        "tags": [
          "15sfest",
          "soon"
        ],
        "location": null,
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": "X-Pro II",
        "created_time": "1371824277",
        "link": "http://instagram.com/p/a0vZibKHZp/",
        "likes": {
          "count": 0,
          "data": []
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage9.s3.amazonaws.com/5f354968da7d11e2b5c422000a1f9a53_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage9.s3.amazonaws.com/5f354968da7d11e2b5c422000a1f9a53_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage9.s3.amazonaws.com/5f354968da7d11e2b5c422000a1f9a53_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [
          {
            "position": {
              "y": 0.51797384,
              "x": 0.459150314
            },
            "user": {
              "username": "stefannagey",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
              "id": "229021601",
              "full_name": "Stefan Nagey"
            }
          }
        ],
        "caption": {
          "created_time": "1371824358",
          "text": "#15sfest #soon",
          "from": {
            "username": "dasmart",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
            "id": "582588",
            "full_name": "D. Archibald  Smart"
          },
          "id": "483220196340299158"
        },
        "type": "image",
        "id": "483219523171284585_582588",
        "user": {
          "username": "dasmart",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
          "full_name": "D. Archibald  Smart",
          "bio": "",
          "id": "582588"
        },
        "_id": "51c4a80fce9d4ffe6a000007"
      },
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage7.s3.amazonaws.com/91754168da7c11e2845f22000a9f3c3e_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage7.s3.amazonaws.com/91754168da7c11e2845f22000a9f3c3e_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "15sfest"
        ],
        "location": null,
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": null,
        "created_time": "1371823932",
        "link": "http://instagram.com/p/a0uvZiKHYn/",
        "likes": {
          "count": 0,
          "data": []
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage7.s3.amazonaws.com/91754168da7c11e2845f22000a9f3c3e_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage7.s3.amazonaws.com/91754168da7c11e2845f22000a9f3c3e_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage7.s3.amazonaws.com/91754168da7c11e2845f22000a9f3c3e_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371824012",
          "text": "#15sfest @samyarose",
          "from": {
            "username": "dasmart",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
            "id": "582588",
            "full_name": "D. Archibald  Smart"
          },
          "id": "483217296356570411"
        },
        "type": "video",
        "id": "483216627407025703_582588",
        "user": {
          "username": "dasmart",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
          "full_name": "D. Archibald  Smart",
          "bio": "",
          "id": "582588"
        },
        "_id": "51c4a80fce9d4ffe6a000008"
      },
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage6.s3.amazonaws.com/30c64b56d9ea11e2b95b22000a1fab39_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage6.s3.amazonaws.com/30c64b56d9ea11e2b95b22000a1fab39_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "powerfail",
          "15sfest"
        ],
        "location": null,
        "comments": {
          "count": 1,
          "data": [
            {
              "created_time": "1371782773",
              "text": "Oh wow. Glad I upgraded my Instagram to see the beaut.",
              "from": {
                "username": "samyarose",
                "profile_picture": "http://images.ak.instagram.com/profiles/profile_13870264_75sq_1364795940.jpg",
                "id": "13870264",
                "full_name": "samyarose"
              },
              "id": "482871360220592106"
            }
          ]
        },
        "filter": "Normal",
        "created_time": "1371761063",
        "link": "http://instagram.com/p/ay20_zqHai/",
        "likes": {
          "count": 0,
          "data": []
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage6.s3.amazonaws.com/30c64b56d9ea11e2b95b22000a1fab39_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage6.s3.amazonaws.com/30c64b56d9ea11e2b95b22000a1fab39_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage6.s3.amazonaws.com/30c64b56d9ea11e2b95b22000a1fab39_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371761075",
          "text": "Samya #15sfest #powerfail",
          "from": {
            "username": "dasmart",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
            "id": "582588",
            "full_name": "D. Archibald  Smart"
          },
          "id": "482689344950793644"
        },
        "type": "video",
        "id": "482689246518867618_582588",
        "user": {
          "username": "dasmart",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
          "full_name": "D. Archibald  Smart",
          "bio": "",
          "id": "582588"
        },
        "_id": "51c4a80fce9d4ffe6a000009"
      },
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage5.s3.amazonaws.com/e15fd8b8dac811e2a76e22000a9f1968_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage5.s3.amazonaws.com/e15fd8b8dac811e2a76e22000a9f1968_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "noir",
          "15sfest"
        ],
        "location": null,
        "comments": {
          "count": 1,
          "data": [
            {
              "created_time": "1371914123",
              "text": "#SleepyLauer",
              "from": {
                "username": "lbetanzo",
                "profile_picture": "http://images.ak.instagram.com/profiles/profile_23833335_75sq_1352581604.jpg",
                "id": "23833335",
                "full_name": "Luis Betanzo"
              },
              "id": "483973203410619149"
            }
          ]
        },
        "filter": null,
        "created_time": "1371856708",
        "link": "http://instagram.com/p/a1tQW2GQql/",
        "likes": {
          "count": 1,
          "data": [
            {
              "username": "lbetanzo",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_23833335_75sq_1352581604.jpg",
              "id": "23833335",
              "full_name": "Luis Betanzo"
            }
          ]
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage5.s3.amazonaws.com/e15fd8b8dac811e2a76e22000a9f1968_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage5.s3.amazonaws.com/e15fd8b8dac811e2a76e22000a9f1968_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage5.s3.amazonaws.com/e15fd8b8dac811e2a76e22000a9f1968_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371856770",
          "text": "#15sfest #noir",
          "from": {
            "username": "stefannagey",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
            "id": "229021601",
            "full_name": "Stefan Nagey"
          },
          "id": "483492088925194670"
        },
        "type": "video",
        "id": "483491571146754725_229021601",
        "user": {
          "username": "stefannagey",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
          "full_name": "Stefan Nagey",
          "bio": "",
          "id": "229021601"
        },
        "_id": "51c841d3293b9f3664000002"
      },
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage10.s3.amazonaws.com/c15bdf52dc3611e2beb322000aaa0754_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage10.s3.amazonaws.com/c15bdf52dc3611e2beb322000aaa0754_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "15sfest"
        ],
        "location": {
          "latitude": 38.971881084,
          "longitude": -76.163704936,
          "country": "us"
        },
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": null,
        "created_time": "1372013850",
        "link": "http://instagram.com/p/a6Y-vWGQi2/",
        "likes": {
          "count": 1,
          "data": [
            {
              "username": "kendiluna",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_48585134_75sq_1335577222.jpg",
              "id": "48585134",
              "full_name": "kendiluna"
            }
          ]
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage10.s3.amazonaws.com/c15bdf52dc3611e2beb322000aaa0754_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage10.s3.amazonaws.com/c15bdf52dc3611e2beb322000aaa0754_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage10.s3.amazonaws.com/c15bdf52dc3611e2beb322000aaa0754_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1372013965",
          "text": "Sliding! #15sfest",
          "from": {
            "username": "stefannagey",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
            "id": "229021601",
            "full_name": "Stefan Nagey"
          },
          "id": "484810739833964739"
        },
        "type": "video",
        "id": "484809774456178870_229021601",
        "user": {
          "username": "stefannagey",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_229021601_75sq_1348876443.jpg",
          "full_name": "Stefan Nagey",
          "bio": "",
          "id": "229021601"
        },
        "_id": "51c841d3293b9f3664000001"
      },
      {
        "attribution": null,
        "tags": [
          "15sfest"
        ],
        "location": {
          "latitude": 38.905819571,
          "longitude": -77.040716367,
          "country": "us"
        },
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": "Amaro",
        "created_time": "1371824646",
        "link": "http://instagram.com/p/a0wGhLKHal/",
        "likes": {
          "count": 0,
          "data": []
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage1.s3.amazonaws.com/3ad9a5c2da7e11e2b1c522000a9f18eb_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage1.s3.amazonaws.com/3ad9a5c2da7e11e2b1c522000a9f18eb_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage1.s3.amazonaws.com/3ad9a5c2da7e11e2b1c522000a9f18eb_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371824681",
          "text": "#15sfest",
          "from": {
            "username": "dasmart",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
            "id": "582588",
            "full_name": "D. Archibald  Smart"
          },
          "id": "483222910684132854"
        },
        "type": "image",
        "id": "483222614205560485_582588",
        "user": {
          "username": "dasmart",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
          "full_name": "D. Archibald  Smart",
          "bio": "",
          "id": "582588"
        },
        "_id": "51c4a80fce9d4ffe6a000005"
      },
      {
        "attribution": null,
        "videos": {
          "low_resolution": {
            "url": "http://distilleryimage10.s3.amazonaws.com/e149f21eda7d11e29a9d22000a1f979c_102.mp4",
            "width": 480,
            "height": 480
          },
          "standard_resolution": {
            "url": "http://distilleryimage10.s3.amazonaws.com/e149f21eda7d11e29a9d22000a1f979c_101.mp4",
            "width": 640,
            "height": 640
          }
        },
        "tags": [
          "reluctantcostar",
          "15sfest"
        ],
        "location": {
          "latitude": 38.905899803,
          "longitude": -77.04074795,
          "country": "us"
        },
        "comments": {
          "count": 0,
          "data": []
        },
        "filter": null,
        "created_time": "1371824496",
        "link": "http://instagram.com/p/a0v0LYqHaO/",
        "likes": {
          "count": 2,
          "data": [
            {
              "username": "natako",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_596858_75sq_1289403829.jpg",
              "id": "596858",
              "full_name": "alex slater"
            },
            {
              "username": "mitchmatilda",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_205427926_75sq_1351097629.jpg",
              "id": "205427926",
              "full_name": "mitchmatilda"
            }
          ]
        },
        "images": {
          "low_resolution": {
            "url": "http://distilleryimage10.s3.amazonaws.com/e149f21eda7d11e29a9d22000a1f979c_6.jpg",
            "width": 306,
            "height": 306
          },
          "thumbnail": {
            "url": "http://distilleryimage10.s3.amazonaws.com/e149f21eda7d11e29a9d22000a1f979c_5.jpg",
            "width": 150,
            "height": 150
          },
          "standard_resolution": {
            "url": "http://distilleryimage10.s3.amazonaws.com/e149f21eda7d11e29a9d22000a1f979c_7.jpg",
            "width": 612,
            "height": 612
          }
        },
        "users_in_photo": [],
        "caption": {
          "created_time": "1371824561",
          "text": "#15sfest #reluctantcostar @samyarose",
          "from": {
            "username": "dasmart",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
            "id": "582588",
            "full_name": "D. Archibald  Smart"
          },
          "id": "483221905921832394"
        },
        "type": "video",
        "id": "483221353859151502_582588",
        "user": {
          "username": "dasmart",
          "website": "",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_582588_75sq_1353497591.jpg",
          "full_name": "D. Archibald  Smart",
          "bio": "",
          "id": "582588"
        },
        "_id": "51c4a80fce9d4ffe6a000006"
      }
    ];

    return function VideoListCtrl($location, $scope) {

      $scope.bestOfList = [mock[0],mock[1],mock[2], mock[3]];
      $scope.featuredList = [mock[4],mock[5]];
      $scope.latestList = [mock[6],mock[7]];
      $scope.modal = {};
      $scope.modal.isOpen = true;
      $scope.modal.video = '';

      //$('#modal-window').modal({show: false});

      $scope.imgClick = function (item){
        $scope.modal.isOpen = true

        //src.src =item.videos.standard_resolution.url;
        //var video = document.getElementsByTagName('video'),
        var source = document.getElementsByTagName('source');
        source[0].setAttribute('src', item.videos.standard_resolution.url);
        source[0].parentNode.load();

        //$('#modal-window').modal('show')
      }

    };
});