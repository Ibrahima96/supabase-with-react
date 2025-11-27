import { createBrowserRouter } from "react-router-dom";
import Signin from "./component/Signin";
import Dashboard from "./routes/Dashboard";
import Header from "./component/Header";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Signin />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
]);







/**
Défi :
* 1) Passez un tableau d’objets de routes à 'createBrowserRouter'
* 2) Chaque objet route doit avoir les propriétés suivantes :
        - path : le chemin d’URL sous forme de chaîne de caractères
        - element : le composant React à afficher
* 3) Créez deux routes :
        - Chemin racine ('/') : affiche le composant Signin
        - Chemin tableau de bord ('/dashboard') : affiche à la fois Header et Dashboard 
          (les deux composants)
*    Astuce : la propriété element de React Router doit avoir un seul élément racine,
     tout comme le return d’un composant
*/
