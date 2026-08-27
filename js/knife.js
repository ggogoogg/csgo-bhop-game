class Knife {
    constructor(scene) {
        this.scene = scene;
        this.group = new THREE.Group();
        this.scene.add(this.group);
        
        this.currentSkin = 'Marble Fade';
        this.createKnife();
        this.createHand();
        
        this.rotation = 0;
    }

    createKnife() {
        // Butterfly knife blade
        const bladeGeometry = new THREE.BoxGeometry(2, 8, 0.3);
        const bladeMaterial = this.getSkinMaterial(this.currentSkin);
        this.blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        this.blade.castShadow = true;
        this.group.add(this.blade);

        // Handle
        const handleGeometry = new THREE.BoxGeometry(2, 5, 0.5);
        const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x2c2c2c });
        this.handle = new THREE.Mesh(handleGeometry, handleMaterial);
        this.handle.position.y = -6;
        this.handle.castShadow = true;
        this.group.add(this.handle);
    }

    createHand() {
        // Green gloves from CS:GO
        const gloveGeometry = new THREE.BoxGeometry(3, 4, 3);
        const gloveMaterial = new THREE.MeshStandardMaterial({ color: 0x00aa00 });
        this.glove = new THREE.Mesh(gloveGeometry, gloveMaterial);
        this.glove.position.set(3, -8, -1);
        this.glove.castShadow = true;
        this.group.add(this.glove);

        // Sleeve
        const sleeveGeometry = new THREE.BoxGeometry(4, 8, 3.5);
        const sleeveMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
        this.sleeve = new THREE.Mesh(sleeveGeometry, sleeveMaterial);
        this.sleeve.position.set(4, -15, -1);
        this.sleeve.castShadow = true;
        this.group.add(this.sleeve);
    }

    getSkinMaterial(skinName) {
        const skins = {
            'Marble Fade': new THREE.MeshStandardMaterial({
                color: 0xff00ff,
                metalness: 0.8,
                roughness: 0.2
            }),
            'Fade': new THREE.MeshStandardMaterial({
                color: 0xffaa00,
                metalness: 0.9,
                roughness: 0.1
            }),
            'Crimson Web': new THREE.MeshStandardMaterial({
                color: 0xcc0000,
                metalness: 0.7,
                roughness: 0.3
            }),
            'Night': new THREE.MeshStandardMaterial({
                color: 0x222222,
                metalness: 0.8,
                roughness: 0.4
            }),
            'Forest DDPAT': new THREE.MeshStandardMaterial({
                color: 0x228b22,
                metalness: 0.6,
                roughness: 0.5
            }),
            'Boreal Forest': new THREE.MeshStandardMaterial({
                color: 0x1a4d2e,
                metalness: 0.7,
                roughness: 0.4
            })
        };
        return skins[skinName] || skins['Marble Fade'];
    }

    changeSkin(skinName) {
        this.currentSkin = skinName;
        this.blade.material = this.getSkinMaterial(skinName);
    }

    update(player) {
        // Position knife in front of camera
        this.group.position.copy(player.camera.position);
        const cameraDir = new THREE.Vector3(
            Math.sin(player.yaw),
            Math.sin(player.pitch),
            Math.cos(player.yaw)
        );
        this.group.position.addScaledVector(cameraDir, 5);
        this.group.position.y -= 3;

        // Rotation and animation
        this.rotation += 0.02;
        this.group.rotation.z = this.rotation * 0.3;
        this.group.rotation.x = player.pitch * 0.3;
        this.group.rotation.y = player.yaw;

        // Bob animation
        this.group.position.y += Math.sin(this.rotation) * 0.3;
    }
}