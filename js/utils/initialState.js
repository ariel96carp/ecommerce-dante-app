import productImage1 from '../../img/c1.jpg'
import productImage2 from '../../img/c2.jpg'
import productImage3 from '../../img/c3.jpg'
import productImage4 from '../../img/c4.jpg'
import productImage5 from '../../img/c5.jpg'
import productImage6 from '../../img/c6.jpg'
import productImage7 from '../../img/c7.jpg'
import productImage8 from '../../img/c8.jpg'
import productImage9 from '../../img/n1.jpg'
import productImage10 from '../../img/n2.jpg'
import productImage11 from '../../img/n3.jpg'
import productImage12 from '../../img/n4.jpg'
import productImage13 from '../../img/n5.jpg'
import productImage14 from '../../img/n6.jpg'
import productImage15 from '../../img/n7.jpg'
import productImage16 from '../../img/n8.jpg'
import blogImage1 from '../../img/z1.jpg'
import blogImage2 from '../../img/z4.jpg'
import blogImage3 from '../../img/z6.jpg'

const initalState = {
    products: [
        {
            id: '35FGD',
            name: 'Cartoon Astronauts T-Shirts',
            enterprise: 'Adidas',
            reviews: 5,
            price: 135,
            url: productImage1,
            type: 'featured',
            description: "The Adicolor 70s collection draws heavily on archival silhouettes and classics. Undeniably \
            adidas, the detail-oriented range combines luxurious and textural materials with a bright color palette to \
            give heritage silhouettes an energetic new form. Modeled off retro football jerseys, the Adicolor 70s Vintage \
            Cali Tee embodies the sartorial freedom of decades past with its bold color palette and 3-Stripes gliding \
            down the arms. Cut for a slim fit, the shirt is made from super-soft jersey and detailed with premium rib \
            at the collar and sleeves for modern appeal."
        },
        {
            id: 'DFSF',
            name: 'Cali T-Shirts',
            enterprise: 'Louis Vuitton',
            reviews: 3,
            price: 210,
            url: productImage2,
            type: 'featured',
            description: "When groups say they want a custom t-shirt, what they're talking about is this Gildan Ultra \
            Cotton T‑shirt. This is basically the epitome of tees, which is why year-after-year it's one of our most \
            popular choices for events. It's made from thick, 6 ounce cotton and has a double-needle stitched crewneck \
            that'll stand up to the craziest one-handed pullover move without warping. The thick, sturdy heavyweight \
            cotton in our Gildan t-shirt can withstand whatever you're going to throw at it. Now seems like a good \
            time to mention that it comes in sizes for kids, teens and adults, all with identically matching dye, \
            like a super-casual bridal party. Oh, and you can just toss it in the wash. It's preshrunk, but the feel \
            will get softer every time you wash it while the color and your custom design both remain bright."
        },
        {
            id: 'GRE0',
            name: 'Trefoil T-Shirts',
            enterprise: 'Nike',
            reviews: 5,
            price: 308,
            url: productImage3,
            type: 'featured',
            description: "No need to overcomplicate things — this adidas t-shirt is all about ease. Keep your vibe real, \
            real chill with the understated look. Though it doesn't give into full minimalism. The comfort goes all out, \
            thanks to the super soft cotton build. Our cotton products support more sustainable cotton farming."
        },
        {
            id: 'L56ER',
            name: 'Vintage Cali T-Shirts',
            enterprise: 'Reebok',
            reviews: 4,
            price: 105,
            url: productImage4,
            type: 'featured',
            description: "Let everyone know that sport is your thing. With a Trefoil on the chest and high-contrast \
            3-Stripes, this adidas t-shirt is a timeless classic and closet staple. Wear it as an everyday look for \
            casual vibes with an athletic edge — and colours that show national pride. Pure cotton jersey with just \
            enough stretch will keep you comfortable. Our cotton products support more sustainable cotton farming."
        },
        {
            id: 'H56GH',
            name: 'Cartoon Astronauts T-Shirts',
            enterprise: 'Zara',
            reviews: 2,
            price: 78,
            url: productImage5,
            type: 'featured',
            description: "Adicolor has set the standard for bold colours and a simple approach since 1983. This adidas \
            t-shirt keeps that same intent alive. A slim fit and ribbing on the crewneck and cuffs add comfort to the \
            minimalist style. This garment is made with a yarn which contains 50% Parley Ocean Plastic — reimagined \
            plastic waste, intercepted on remote islands, beaches, coastal communities and shorelines, preventing \
            it from polluting our ocean. This garment contains at least 40% recycled content in total."
        },
        {
            id: 'FGDG',
            name: 'Athletic Club T-Shirts',
            enterprise: 'Dior',
            reviews: 5,
            price: 100,
            url: productImage6,
            type: 'featured',
            description: "Street style all day, every day. Even when it comes to the basics. This long sleeve tee gets \
            a full makeover with adidas details. A signature Trefoil. Iconic 3-Stripes down the arms. Soft cotton keeps \
            you comfy so you can focus on looking your best. Our cotton products support sustainable cotton farming. \
            This is part of our ambition to end plastic waste."
        },
        {
            id: 'DF9ER',
            name: '70s Velour Pants',
            enterprise: 'Adidas',
            reviews: 5,
            price: 405,
            url: productImage7,
            type: 'featured',
            description: "When groups say they want a custom t-shirt, what they're talking about is this Gildan Ultra \
            Cotton T‑shirt. This is basically the epitome of tees, which is why year-after-year it's one of our most \
            popular choices for events. It's made from thick, 6 ounce cotton and has a double-needle stitched crewneck \
            that'll stand up to the craziest one-handed pullover move without warping. The thick, sturdy heavyweight \
            cotton in our Gildan t-shirt can withstand whatever you're going to throw at it. Now seems like a good \
            time to mention that it comes in sizes for kids, teens and adults, all with identically matching dye, \
            like a super-casual bridal party. Oh, and you can just toss it in the wash. It's preshrunk, but the feel \
            will get softer every time you wash it while the color and your custom design both remain bright."
        },
        {
            id: '23DF',
            name: '3-Stripes Camo T-Shirts',
            enterprise: 'Prada',
            reviews: 4,
            price: 350,
            url: productImage8,
            type: 'featured',
            description: "Simplicity is all about comfort, and this adidas t-shirt is all about you. With a puff-print \
            Trefoil and 3-Stripes, it has a subtle, eye-catching design that's also beautifully restrained. A loose \
            fit lets you move around in comfort and pairs perfectly with leggings or tapered pants. The best part? \
            That silky-soft cotton that's supremely cosy every time you put it on. Our cotton products support more \
            sustainable cotton farming."
        },
        {
            id: '46DFE',
            name: 'Freelift T-Shirts',
            enterprise: 'Chanel',
            reviews: 4,
            price: 280,
            url: productImage9,
            type: 'arrived',
            description: "Classic camo gets a fresh update with this adidas 3-Stripes Camo Tee. The design adds an \
            unexpected twist to the shoulders to bring a little diversity to your daily tee. Soft cotton makes it \
            ready for everyday comfort. Our cotton products support more sustainable cotton farming."
        },
        {
            id: '5HGH',
            name: 'Camo Print T-Shirts',
            enterprise: 'Valenciaga',
            reviews: 3,
            price: 120,
            url: productImage10,
            type: 'arrived',
            description: "Sometimes you just have to keep things simple. No fuss. Easy. Enter this adidas t-shirt. \
            It's one step up from completely minimalist, since there's the bold, contrast adidas graphic that flashes \
            across the chest. But it is something that goes along with your everyday moves, whatever that looks like, \
            and keeps you comfortable along the way (thanks to the soft cotton build)."
        },
        {
            id: '89ERD',
            name: 'Cartoon Astronauts T-Shirts',
            enterprise: 'Adidas',
            reviews: 5,
            price: 300,
            url: productImage11,
            type: 'arrived',
            description: "You'd be right to think that this adidas t-shirt has a completely retro look to it. It's \
            because its inspiration comes straight form the archives. A celebration of the iconic Trefoil, a swirling \
            collage of them takes over, complemented by vibrant pops of colour throughout."
        },
        {
            id: 'QE69D',
            name: 'Brad Love T-Shirts',
            enterprise: 'Gucci',
            reviews: 4,
            price: 123,
            url: productImage12,
            type: 'arrived',
            description: "Adicolor has set the standard for bold colours and a simple approach since 1983. This adidas \
            t-shirt keeps that same intent alive. A slim fit and ribbing on the crewneck and cuffs add comfort to the \
            minimalist style. This garment is made with a yarn which contains 50% Parley Ocean Plastic — reimagined \
            plastic waste, intercepted on remote islands, beaches, coastal communities and shorelines, preventing it \
            from polluting our ocean. This garment contains at least 40% recycled content in total."
        },
        {
            id: '5DF6S',
            name: 'Linear Logo T-Shirts',
            enterprise: 'Adidas',
            reviews: 3,
            price: 225,
            url: productImage13,
            type: 'arrived',
            description: "Mountains. You climb them. You admire them. And if you live near them, you use them to orient \
            yourself on the compass rose. This adidas Terrex t-shirt pays homage to these geological wonders. This \
            product is made with recycled content. Our cotton products support sustainable cotton farming. This is \
            part of our ambition to end plastic waste."
        },
        {
            id: '56DFQW',
            name: '3-Stripes Sweet Shorts',
            enterprise: 'Moncler',
            reviews: 3,
            price: 185,
            url: productImage14,
            type: 'arrived',
            description: "Comfortably transition from the gym to the street with ease. These adidas shorts feature \
            AEROREADY construction, which absorbs moisture and keeps you dry. Classic 3-Stripes styling runs from hip \
            to hem, giving a sporty aesthetic to these comfy shorts. This product is made with Primegreen, a series \
            of high-performance recycled materials."
        },
        {
            id: 'P79TD',
            name: 'Cartoon Astronauts T-Shirts',
            enterprise: 'Ralph Lauren',
            reviews: 5,
            price: 78,
            url: productImage15,
            type: 'arrived',
            description: "You'd be right to think that this adidas t-shirt has a completely retro look to it. It's \
            because its inspiration comes straight form the archives. A celebration of the iconic Trefoil, a swirling \
            collage of them takes over, complemented by vibrant pops of colour throughout."
        },
        {
            id: 'LSDA',
            name: 'Campus T-Shirts',
            enterprise: 'Nike',
            reviews: 4,
            price: 110,
            url: productImage16,
            type: 'arrived',
            description: "Classic camo gets a fresh update with this adidas 3-Stripes Camo Tee. The design adds an \
            unexpected twist to the shoulders to bring a little diversity to your daily tee. Soft cotton makes it \
            ready for everyday comfort. Our cotton products support more sustainable cotton farming."
        }
    ],
    articles: [
        {
            id: 1,
            date: '12/04',
            url: blogImage1,
            title: 'The Cotton-Jersey Zip-Up Hoodie',
            description: 'Kinkstarter main braid godard coloring book. Raclette waistcoat selfies yr walf \
            chartreuse hexagon irony godard.'
        },
        {
            id: 2,
            date: '16/04',
            url: blogImage2,
            title: 'Runaway-Inspired Trends',
            description: 'Kinkstarter main braid godard coloring book. Raclette waistcoat selfies yr walf \
            chartreuse hexagon irony godard.'
        },
        {
            id: 3,
            date: '28/06',
            url: blogImage3,
            title: 'AW30 Menswear Trends',
            description: 'Kinkstarter main braid godard coloring book. Raclette waistcoat selfies yr walf \
            chartreuse hexagon irony godard.'
        },
    ],
    sales: [],
    discount: {
        active: false,
        rate: '25%'
    }
}

export default initalState
