import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder } from "@babylonjs/core";
class App {
    constructor() {

        //create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        // var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        const camera = new ArcRotateCamera("Camera", Math.PI / 4, Math.PI / 3.5, 9, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

        const box = MeshBuilder.CreateBox("clickbox", { size: 5, width: 5, height: 5 }, scene);
        let rotatingMesh;
        let startX;
        let startY;
        let clickedFaceIndex;
        scene.onPointerDown = (event, pickInfo) => {
            rotatingMesh = pickInfo.pickedMesh;
            if (rotatingMesh) {

                startX = scene.pointerX;
                startY = scene.pointerY;
                // camera.detachControl();
                // console.log("Start X" + startX);
                // console.log("Start Y" + startY);
                pickInfo = scene.pick(scene.pointerX, scene.pointerY, (mesh) => mesh === box);
                if (pickInfo.pickedMesh) {
                    clickedFaceIndex = Math.floor(pickInfo.faceId / 2);
                    // console.log("Clicked Face Index" + clickedFaceIndex);
                }
            }
        }

        scene.onPointerMove = () => {
            //Needs to add the Logic for the Transition 
            if (rotatingMesh) {

            }
        }
        // hide/show the Inspector
        // window.addEventListener("keydown", (ev) => {
        //     // Shift+Ctrl+Alt+I
        //     if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
        //         if (scene.debugLayer.isVisible()) {
        //             scene.debugLayer.hide();
        //         } else {
        //             scene.debugLayer.show();
        //         }
        //     }
        // });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();