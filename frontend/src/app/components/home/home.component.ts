import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /*------------------------------------------------------------------*/
  // Variables
  /*------------------------------------------------------------------*/

  public color: String; //* Color default en Cliente Modal
  public closeResult: String; //* Mensaje de cierre Modal
  public myInnerHeight: Number = window.innerHeight - (window.innerHeight * .30); //* Tamaño de tabla
  public isMenuCollapsed: Boolean = true; //* Toogle Navbar

  /*------------------------------------------------------------------*/
  // Variables Cámara
  /*------------------------------------------------------------------*/

  public showWebcam: Boolean;
  public multipleWebcamsAvailable: Boolean = false;
  public errorsCamera: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private _modalService: NgbModal,
    private _router: Router
  ) { }

  /*------------------------------------------------------------------*/
  // Funciones Modal
  /*------------------------------------------------------------------*/

  private getDismissReason(reason: any): string { //* Gestor de errores Modal
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public open(tarjet): void { //* Abre los Modals
    this._modalService.open(tarjet, { size: 'lg', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public openCliente(cliente): void { //* Configura el modal especial del cliente
    this.color = '#ffffff';
    this.showWebcam = true;
    this.webcamImage = null;
    this.open(cliente);
  }

  /*------------------------------------------------------------------*/
  // Funciones cámara
  /*------------------------------------------------------------------*/

  public get triggerObservable(): Observable<void> { //* Permite la ejecición de la imagen
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void { //* Guarda la imagen en variable
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public toggleWebcam(): void { //* Muestra la cámara - La oculta
    this.showWebcam = !this.showWebcam;
  }

  public triggerSnapshot(): void { //* Toma la foto de la cámara
    this.trigger.next();
    this.toggleWebcam();
  }

  public handleInitError(error: WebcamInitError): void { //* Gestor de errores de la cámara
    this.errorsCamera.push(error);
  }

  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

}
