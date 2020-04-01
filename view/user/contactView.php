<div class='container mt-5 mb-5 h-100 d-flex align-items-center justify-content-center'>
    <form class="needs-validation p-3" id="contact" action="contact.php" method="post" novalidate>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="nom">Nom</label>
                <input type="text" class="form-control" name="nom" pattern="<?= DataValider::$regex['lastname']; ?>" required>
                <div class="valid-feedback">
                    Champ Validé !
                </div>
                <div class="invalid-feedback">
                    Champ obligatoire : Uniquement lettre majuscules ou minuscules, espaces et - (min 3, max 100)
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="prenom">Prénom</label>
                <input type="text" class="form-control" name="prenom" pattern="<?= DataValider::$regex['firstname']; ?>" required>
                <div class="valid-feedback">
                    Champ Validé !
                </div>
                <div class="invalid-feedback">
                    Champ obligatoire : Uniquement lettre majuscules ou minuscules et - (min 3, max 27)
                </div>
            </div>
        </div>
        <div class="form-row d-flex justify-content-center">
            <div class="form-group col-md-6">
                <label for="email">email</label>
                <input type="email" class="form-control" id="mail" name="email" pattern="<?= DataValider::$regex['mail']; ?>" required>
                <div class="valid-feedback">
                    ok
                </div>
                <div class="invalid-feedback">
                    (exemple de format attendu: mrdupond@outlook.fr) téléphone ou mail obligatoire
                </div>
            </div>

        </div>

        <div class="form-row d-flex justify-content-center">
            <div class="form-group col-md-10">
                <label for="demande">Demande</label>
                <textarea class="form-control" id="text" rows="3" name="demande" pattern="<?= DataValider::$regex['text']; ?>" required></textarea>
                <div class="valid-feedback">
                </div>
                <div class="invalid-feedback">
                    Champ obligatoire : texte (min 1, max 500)
                </div>
            </div>
        </div>
        <button type="submit" form='contact' class="btn btn-success">Sauvegarder</button>
    </form>
</div>