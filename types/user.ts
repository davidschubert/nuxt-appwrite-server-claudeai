export interface User {
    $id: string;
    $createdAt: Date;
    $updatedAt: Date;
    name: string;
    password: string;
    hash: string;
    hashOptions: HashOptions;
    registration: Date;
    status: boolean;
    labels: string[];
    passwordUpdate: Date;
    email: string;
    phone: string;
    emailVerification: boolean;
    phoneVerification: boolean;
    mfa: boolean;
    prefs: Prefs;
    targets: Targets[];
    accessedAt: Date;
}

export interface HashOptions {
    type: string;
    memoryCost: number;
    timeCost: number;
    threads: number;
}

export interface Prefs {}

export interface Targets {
    $id: string;
    $createdAt: Date;
    $updatedAt: Date;
    name: string;
    userId: string;
    providerId: string;
    providerType: string;
    identifier: string;
}
