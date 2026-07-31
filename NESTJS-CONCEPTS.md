# Concepts de base NestJS

Petit résumé des briques principales de NestJS, illustrées avec les fichiers de ce projet (`src/`).

## Modules

Un module regroupe des fonctionnalités liées (controllers, services...). Chaque application a au moins un module racine, `AppModule`.

```ts
// src/app.module.ts
@Module({
  imports: [],        // autres modules utilisés
  controllers: [AppController], // controllers du module
  providers: [AppService],      // services/providers du module
})
export class AppModule {}
```

## Controllers

Un controller reçoit les requêtes HTTP et renvoie une réponse. Il définit les routes via des décorateurs (`@Get`, `@Post`, etc.). Il ne contient pas la logique métier : il délègue au service.

```ts
// src/app.controller.ts
@Controller() // préfixe de route (ici vide -> "/")
export class AppController {
  constructor(private readonly appService: AppService) {} // injection de dépendance

  @Get() // GET /
  getHello(): string {
    return this.appService.getHello();
  }
}
```

## Services (Providers)

Un service contient la logique métier (calculs, accès aux données, etc.). Il est marqué `@Injectable()` pour pouvoir être injecté dans un controller ou un autre service.

```ts
// src/app.service.ts
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

> "Provider" est le terme général de NestJS : un service est le type de provider le plus courant, mais on y trouve aussi les repositories, factories, helpers...

## Injection de dépendances (DI)

NestJS instancie automatiquement les classes et les injecte là où elles sont demandées (via le constructeur). C'est ce qui permet à `AppController` de recevoir une instance d'`AppService` sans avoir à la créer lui-même. Nest gère le cycle de vie des instances grâce aux métadonnées des décorateurs (`@Module`, `@Injectable`, `@Controller`).

## Point d'entrée (bootstrap)

`main.ts` démarre l'application en créant une instance Nest à partir du module racine, puis en la faisant écouter sur un port.

```ts
// src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## Résumé du flux d'une requête

```
Requête HTTP → Controller (route) → Service (logique métier) → Réponse
```

## Prisma (ORM)

Prisma est un ORM qui permet de définir le schéma de la base de données et de générer un client TypeScript typé pour interroger cette base, sans écrire de SQL à la main.

- `prisma/schema.prisma` : décrit la connexion à la base (`datasource`) et les modèles de données (tables).
- `@prisma/client` : le client généré à partir du schéma, utilisé dans le code (généralement via un `PrismaService` injectable) pour faire les requêtes (`findMany`, `create`, `update`...).
- `DATABASE_URL` (dans `.env`) : l'URL de connexion à la base, jamais commitée sur Git.
- `npx prisma migrate dev` : applique les changements du schéma à la base et génère une migration.
- `npx prisma generate` : régénère le client Prisma après une modification du schéma.

Installé mais pas encore utilisé dans le code : le schéma ne contient pas encore de modèle, et aucun `PrismaModule`/`PrismaService` n'a été créé pour l'instant.

Base de données configurée : MySQL, base `football` (créée via XAMPP), connexion définie dans `.env` (`DATABASE_URL`, non commité).

## Autres concepts NestJS courants (pas encore utilisés dans ce projet)

- **DTO (Data Transfer Object)** : classe décrivant la forme des données reçues/envoyées, souvent couplée à la validation (`class-validator`).
- **Middleware** : fonction exécutée avant le controller (logging, auth basique...).
- **Guard** : détermine si une requête a le droit d'accéder à une route (ex: authentification).
- **Pipe** : transforme ou valide les données entrantes (ex: `ValidationPipe`).
- **Interceptor** : peut modifier la requête/réponse, ajouter de la logique avant/après l'exécution du handler (logging, cache, transformation de réponse).
- **Exception Filter** : centralise la gestion des erreurs et formate les réponses d'erreur.
