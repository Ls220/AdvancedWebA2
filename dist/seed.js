"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());

        
    });
};                                              //generated tesst code for seeding test
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("@/lib/mongodb");
var Product_1 = __importDefault(require("@/models/Product"));
var products = [
    {
        name: 'Classic T-Shirt',
        price: 29.99,
        description: 'Premium cotton t-shirt with modern fit',
        category: 'men',
        subcategory: 'tshirts',
        model3d: '/models/T-shirt.glb',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
            { name: 'White', hexCode: '#FFFFFF', inStock: true },
            { name: 'Black', hexCode: '#000000', inStock: true },
            { name: 'Navy', hexCode: '#000080', inStock: true }
        ],
        stock: 100,
        isNew: true,
        isFeatured: true
    },
    {
        name: 'Leather Jacket',
        price: 199.99,
        description: 'Stylish leather jacket for any occasion',
        category: 'men',
        subcategory: 'jackets',
        model3d: '/models/Jacket.glb',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
            { name: 'Brown', hexCode: '#8B4513', inStock: true },
            { name: 'Black', hexCode: '#000000', inStock: true }
        ],
        stock: 50,
        material: 'Genuine Leather',
        careInstructions: 'Professional leather cleaning only'
    },
    {
        name: 'Elegant Midi Skirt',
        price: 79.99,
        description: 'Dark blue pleated loose midi skirt',
        category: 'women',
        subcategory: 'skirts',
        model3d: '/models/dark_blue_irregular_pleated_loose_midi_skirt.glb',
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&auto=format&fit=crop&q=60',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: [
            { name: 'Navy', hexCode: '#000080', inStock: true },
            { name: 'Black', hexCode: '#000000', inStock: true }
        ],
        stock: 75,
        isNew: true
    },
    {
        name: 'Tan Coat',
        price: 249.99,
        description: 'Elegant tan woman\'s coat for all seasons',
        category: 'women',
        subcategory: 'coats',
        model3d: '/models/tan_womans_coat.glb',
        image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&auto=format&fit=crop&q=60',
        sizes: ['S', 'M', 'L'],
        colors: [
            { name: 'Tan', hexCode: '#D2B48C', inStock: true }
        ],
        stock: 30,
        material: 'Wool Blend',
        isFeatured: true
    },
    {
        name: 'Kids Party Dress',
        price: 49.99,
        description: 'Adorable party dress for special occasions',
        category: 'kids',
        subcategory: 'dresses',
        model3d: '/models/kids_dress.glb',
        image: 'https://images.unsplash.com/photo-1543060829-a0029874b174?w=800&auto=format&fit=crop&q=60',
        sizes: ['3-4Y', '4-5Y', '5-6Y', '6-7Y'],
        colors: [
            { name: 'Pink', hexCode: '#FFC0CB', inStock: true },
            { name: 'Purple', hexCode: '#800080', inStock: true }
        ],
        stock: 40,
        isNew: true
    }
];
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var createdProducts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                
                    return [4 /*yield*/, (0, mongodb_1.connectToDatabase)()
                        // Clear existing products
                    ];
                case 1:
            
                    _a.sent();
    
                    return [4 /*yield*/, Product_1.default.deleteMany({})];
                case 2:
                
                    _a.sent();
                    console.log('Cleared existing products');
                    return [4 /*yield*/, Product_1.default.insertMany(products)];
                case 3:
                    createdProducts = _a.sent();
                    console.log("Seeded ".concat(createdProducts.length, " products"));
                    process.exit(0);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error seeding database:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
seed();
