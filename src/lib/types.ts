import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

export type Game = {
    id: string,
    title: string,
    description: string,
    cover: string,
    trailer: string,
    discountedPrice: number,
    price: number,
    status: string,
    genres: string[],
    features: string,
    reviews: string[]
}

export type CartProduct = {
    gameId: string,
    cover: string,
    title: string,
    price: number,
    quantity: number,
}

export type Cart = {
    expiration: number,
    products: CartProduct[]
}

export type CartContextType = {
    cart: Cart,
    updateCart: (gameId: string, action: string) => Promise<void>,
    removeFromCart: (gameId: string) => void
}

export type Query = {
    title: string | null,
    sortBy: string | null,
    discount: boolean,
    pageNumber: number,
    pageSize: number,
    facets: string | null
}

export type SocialItem = {
    icon: IconDefinition,
}

export type SocialItems = SocialItem[]

export type AuthContextType = {
    auth: Auth,
    loginUser(username: string, password: string): Promise<{
        errorCode: number;
        errorMessage: string;
        isError: boolean;
    } | {
        isError: boolean;
    } | undefined>,
    logoutUser(): Promise<{
        errorCode: string;
        errorMessage: string;
        isError: boolean;
    } | {
        isError: boolean;
    }>,
    registerUser(username: string, password: string, firstName: string, lastName: string): Promise<{
        errorCode: number;
        errorMessage: string;
        isError: boolean;
    } | {
        isError: boolean;
    } | undefined>
}

export type LoginResponse = {
    username: string,
    firstName: string,
    lastName: string,
    _id: string,
    accessToken: string,
    code: number,
    message: string,
}

export type Auth = {
    id: string,
    username: string,
    accessToken: string,
}

export type RegisterResponse = {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    _createdOn: number,
    _id: string,
    accessToken: string,
    code: number,
    message: string
}

export type GetUserInfoResponse = {
    username: string,
    firstName: string,
    lastName: string,
    _id: string,
    code: number,
    message: string
}

export type ServerError = {
    errorCode: number,
    errorMessage: string,
    isError: boolean
}

export type GetGameByIdResponse = {
    game: Game
}

export type FacetValue = {
    id: string,
    count: number,
    name: string
}

export type Facets = {
    [key: string]: FacetValue[];
}

export type SearchGamesResponse = {
    facets: Facets,
    offset: number,
    pageSize: number,
    results: Game[],
    totalResults: number
}

export type GetUpcomingGamesResponse = {
    games: Game[]
}

export type SubmenuItem = {
    title: string,
    nav: string
}

export type DropDownItem = {
    title: string,
    submenu: SubmenuItem[]
}

export type DropDownItems = DropDownItem[]

export type OrderProduct = {
    gameId: string,
    quantity: number,
    price: number
}

export type OrderProducts = OrderProduct[]

export type OrderUserInfo = {
    fullName: string
    email: string
    address: string
    city: string
    cardName: string
    cardNumber: string
    expYear: string
    cvv: string
}

export type CreatedOrderProduct = {
    orderId: string,
    gameId: string,
    quantity: number,
    price: number
}

export type UserGameComment = {
    _ownerId: string,
    _gameId: string,
    description: string,
    rating: number,
    _id: string,
}

export type UserGameComments = UserGameComment[]

export type GameComment = {
    author: CommentAuthor
} & UserGameComment

export type GameComments = GameComment[]

export type CommentAuthor = {
    username: string,
    firstName: string,
    lastName: string,
    _id: string,
}

export type NewComment = {
    _gameId: string,
    description: string,
    rating: number
}

export type UpdatedComment = {
    _updatedOn: number
} & UserGameComment

export type ShortValidation = {
    description?: string
}

export type EditModalState = {
    isOpen: boolean,
    comment: GameComment
}

export type ApiError = {
    code: number,
    message: string,
}

